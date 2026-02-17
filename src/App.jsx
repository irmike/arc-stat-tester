import './App.css';
import Tree from "./components/Tree/Tree.jsx";
import InfoDisplay from "./components/InfoDisplay/InfoDisplay.jsx";
import { useState, useRef, useEffect} from "react";

function App() {
    const [scale, setScale] = useState(1); // will be auto-fitted
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);
    const treeInnerRef = useRef(null);
    const pinch = useRef({ active: false, startDist: 0, startScale: 1 });

    // refs for drag math
    const draggingRef = useRef(false);
    const startPointRef = useRef({ x: 0, y: 0 });
    const startPanRef = useRef({ x: 0, y: 0 });
    const panRef = useRef({ x: 0, y: 0 });

    // Auto-fit tree to viewport height on mount
    useEffect(() => {
        if (!treeInnerRef.current || !containerRef.current) return;

        const timer = setTimeout(() => {
            const treeHeight = treeInnerRef.current.scrollHeight;
            const containerHeight = containerRef.current.clientHeight;

            if (treeHeight > 0 && containerHeight > 0) {
                // the 0.9 is to leave some padding for the tree view
                const fitScale = (containerHeight * 0.85) / treeHeight;
                setScale(Math.min(fitScale, 1));
            }
        }, 100); // small delay to ensure render

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        panRef.current = pan;
    }, [pan]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const clamp = v => Math.max(0.4, Math.min(3, v));

        // Wheel zoom
        const onWheel = e => {
            e.preventDefault();
            const step = e.deltaY > 0 ? -0.05 : 0.05;
            setScale(prev => clamp(prev + step));
        };

        // Pinch handlers (existing)
        const getDist = (t1, t2) => {
            const dx = t1.clientX - t2.clientX;
            const dy = t1.clientY - t2.clientY;
            return Math.hypot(dx, dy);
        };

        const onTouchStart = e => {
            if (e.touches.length === 2) {
                // start pinch
                pinch.current.active = true;
                pinch.current.startDist = getDist(e.touches[0], e.touches[1]);
                pinch.current.startScale = scale;
                // cancel any dragging start
                draggingRef.current = false;
                setIsDragging(false);
            } else if (e.touches.length === 1 && !pinch.current.active) {
                // start single-finger pan
                const t = e.touches[0];
                draggingRef.current = true;
                setIsDragging(true);
                startPointRef.current = { x: t.clientX, y: t.clientY };
                startPanRef.current = panRef.current;
            }
        };

        const onTouchMove = e => {
            if (pinch.current.active && e.touches.length === 2) {
                e.preventDefault();
                const dist = getDist(e.touches[0], e.touches[1]);
                const newScale = pinch.current.startScale * (dist / pinch.current.startDist);
                setScale(() => clamp(newScale));
                return;
            }

            if (draggingRef.current && e.touches.length === 1) {
                e.preventDefault();
                const t = e.touches[0];
                const dx = t.clientX - startPointRef.current.x;
                const dy = t.clientY - startPointRef.current.y;
                // adjust pan by dividing by scale so visual movement matches finger
                const newPan = {
                    x: startPanRef.current.x + dx / Math.max(scale, 0.001),
                    y: startPanRef.current.y + dy / Math.max(scale, 0.001)
                };
                panRef.current = newPan;
                setPan(newPan);
            }
        };

        const onTouchEnd = e => {
            if (e.touches.length < 2) pinch.current.active = false;
            if (e.touches.length === 0) {
                draggingRef.current = false;
                setIsDragging(false);
            }
        };

        // Mouse pan handlers
        const onMouseDown = e => {
            if (e.button !== 0) return; // left button only
            draggingRef.current = true;
            setIsDragging(true);
            startPointRef.current = { x: e.clientX, y: e.clientY };
            startPanRef.current = panRef.current;
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp, { once: true });
        };

        const onMouseMove = e => {
            if (!draggingRef.current) return;
            const dx = e.clientX - startPointRef.current.x;
            const dy = e.clientY - startPointRef.current.y;
            const newPan = {
                x: startPanRef.current.x + dx / Math.max(scale, 0.001),
                y: startPanRef.current.y + dy / Math.max(scale, 0.001)
            };
            panRef.current = newPan;
            setPan(newPan);
        };

        const onMouseUp = () => {
            draggingRef.current = false;
            setIsDragging(false);
            window.removeEventListener('mousemove', onMouseMove);
        };

        // attach listeners
        container.addEventListener('wheel', onWheel, { passive: false });
        container.addEventListener('mousedown', onMouseDown);

        container.addEventListener('touchstart', onTouchStart, { passive: false });
        container.addEventListener('touchmove', onTouchMove, { passive: false });
        container.addEventListener('touchend', onTouchEnd);

        return () => {
            container.removeEventListener('wheel', onWheel);
            container.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);

            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
        };
    }, [scale]); // rebind when scale changes

    return (
        <div className={`App ${isDragging ? 'dragging' : ''}`} ref={containerRef}>
            <div className="tree-wrapper">
                {/* apply scale and pan via CSS variables */}
                <div
                    ref={treeInnerRef}
                    className="tree-inner"
                    style={{
                        "--scale": String(scale),
                        "--pan-x": `${pan.x}px`,
                        "--pan-y": `${pan.y}px`
                    }}
                >
                    <Tree />
                </div>
            </div>
            <InfoDisplay />
        </div>
    );
}

export default App
