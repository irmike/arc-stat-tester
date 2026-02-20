import './App.css';
import Tree from "./components/Tree/Tree.jsx";
import InfoDisplay from "./components/InfoDisplay/InfoDisplay.jsx";
import usePanAndZoom from "./hooks/usePanAndZoom";
import { useState, useCallback, useMemo } from "react";
import "./components/Tree/Tree.css";
import PointsHeader from "./components/PointsHeader/PointsHeader.jsx";

function App() {
    const {
        scale,
        pan,
        isDragging,
        containerRef,
        treeInnerRef
    } = usePanAndZoom();

    // Move points state up to App
    const defaultPoints = 76;
    const [points, setPoints] = useState(defaultPoints);
    const increasePoints = useCallback(() => setPoints(p => p + 1), []);
    const decreasePoints = useCallback(() => setPoints(p => Math.max(0, p - 1)), []);
    const pointFuncts = useMemo(
        () => ({points, increasePoints, decreasePoints}),
        [points, increasePoints, decreasePoints]
    );

    // Expeditions logic
    const handleExpeditionsTotalChange = (expeditionsTotal) => {
        setPoints(defaultPoints + expeditionsTotal);
    };

    return (
        <>
            <div className={`App ${isDragging ? 'dragging' : ''}`} ref={containerRef}>
                <div className="tree-wrapper">
                    <PointsHeader points={points} onExpeditionsTotalChange={handleExpeditionsTotalChange} />
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
                        <Tree pointFuncts={pointFuncts} />
                    </div>
                </div>
                <InfoDisplay />
            </div>
        </>
    );
}

export default App
