import './App.css';
import Tree from "./objects/tree/tree.jsx";
import { useState, useRef, useEffect} from "react";

function App() {
    const [scale, setScale] = useState(0.8); // start zoomed out
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);

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

        return () => {
            container.removeEventListener('wheel', onWheel);
            container.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [scale]); // rebind when scale changes (used in math)

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
