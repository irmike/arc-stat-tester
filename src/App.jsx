import './App.css';
import Tree from "./objects/tree/tree.jsx";
import { useState, useRef, useEffect} from "react";

function App() {
    const [scale, setScale] = useState(0.8); // start zoomed out
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);
    const pinch = useRef({ active: false, startDist: 0, startScale: 1 });

    // refs for drag math
    const draggingRef = useRef(false);
    const startPointRef = useRef({ x: 0, y: 0 });
    const startPanRef = useRef({ x: 0, y: 0 });
    const panRef = useRef({ x: 0, y: 0 });

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
                    className="tree-inner"
                    style={{
                        "--scale": String(scale),
                        "--pan-x": `${pan.x}px`,
                        "--pan-y": `${pan.y}px`
                    }}
                >
                    <div className="tree-content">
                        <Tree />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App
