import './App.css';
import Tree from "./components/Tree/Tree.jsx";
import InfoDisplay from "./components/InfoDisplay/InfoDisplay.jsx";
import usePanAndZoom from "./hooks/usePanAndZoom";

function App() {
    const {
        scale,
        setScale,
        pan,
        setPan,
        isDragging,
        containerRef,
        treeInnerRef
    } = usePanAndZoom();

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
