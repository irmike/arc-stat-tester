import {useCallback, useRef, useState} from "react";
import Node from "../Node/Node.jsx";
import "./TreeSection.css";

const directionToFlex = {
    "left": ["row-reverse", "column-reverse"],
    "right": ["row", "column"],
    "up": ["column-reverse", "row"]
};

function TreeSection ({name, direction, data, pointFuncts}) {
    const [total, setTotal] = useState(0);
    const nodeLocksRef = useRef({});

    // Find the first node's name for this section
    const firstNodeName = data[0]?.[0]?.name;

    const registerLockSetter = useCallback((nodeName, setter) => {
        nodeLocksRef.current[nodeName] = setter;
    }, []);

    const unregisterLockSetter = useCallback((nodeName) => {
        delete nodeLocksRef.current[nodeName];
    }, []);

    const unlockNodeByName = useCallback((nodeNameToUnlock) => {
        const setter = nodeLocksRef.current[nodeNameToUnlock];
        if (typeof setter === "function") {
            setter(false);
        }
    }, []);

    // Only lock if not the first node
    const lockNodeByName = useCallback((nodeNameToLock) => {
        if (nodeNameToLock === firstNodeName) return;
        const setter = nodeLocksRef.current[nodeNameToLock];
        if (typeof setter === "function") {
            setter(true);
        }
    }, [firstNodeName]);

    const increaseTotal = () => {
        setTotal(prevTotal => prevTotal + 1);
        pointFuncts["decreasePoints"]();
    };

    const decreaseTotal = () => {
        if(total > 0){
            setTotal(prevTotal => prevTotal - 1);
            pointFuncts["increasePoints"]()
        }
    };

    // Determine highlight color based on section name
    let highlight = "darkgray";
    if (name === "Survival") highlight = "red";
    else if (name === "Mobility") highlight = "goldenrod";
    else if (name === "Conditioning") highlight = "limegreen";

    return (
        <div className="tree-section" style={{flexDirection: directionToFlex[direction][0]}}>
            {data.map((subsection, subSectionIndex) => (
                <div
                    key={subSectionIndex}
                    className="tree-section__row"
                    style={{flexDirection: directionToFlex[direction][1]}}
                >
                    {subsection.map((nodeData, i) => (
                        <Node
                            key={nodeData.name ?? i}
                            nodeData={nodeData}
                            increaseTotal={increaseTotal}
                            decreaseTotal={decreaseTotal}
                            points={pointFuncts["points"]}
                            locked={nodeData.name !== firstNodeName}
                            registerLockSetter={registerLockSetter}
                            unregisterLockSetter={unregisterLockSetter}
                            unlockNodeByName={unlockNodeByName}
                            lockNodeByName={lockNodeByName}
                            highlight={highlight}
                        />
                    ))}
                </div>
            ))}
            <div className="tree-section__summary" style={{flexDirection: directionToFlex[direction][1]}}>
                <div className="tree-section__summary-inner">
                    <h2>{name.toUpperCase()}</h2>
                    <h2>{total}</h2>
                </div>
            </div>
        </div>
    );
}

export default TreeSection;