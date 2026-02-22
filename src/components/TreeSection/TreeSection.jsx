/*
 * TreeSection.jsx - Renders a section of the skill tree with its nodes and logic.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import {useCallback, useState} from "react";
import Node from "../Node/Node.jsx";
import "./TreeSection.css";

const directionToFlex = {
    "left": ["row-reverse", "column-reverse"],
    "right": ["row", "column"],
    "up": ["column-reverse", "row"]
};

function TreeSection ({name, direction, data, pointFuncts}) {
    const [total, setTotal] = useState(0);
    const [openNodeName, setOpenNodeName] = useState(null);
    // Centralized lock state for nodes
    const [nodeLocks, setNodeLocks] = useState(() => {
        // Initialize lock state: first node unlocked, others locked
        const firstNodeName = data[0]?.[0]?.name;
        const locks = {};
        data.forEach(subsection => {
            subsection.forEach(node => {
                locks[node.name] = node.name !== firstNodeName;
            });
        });
        return locks;
    });

    // Find the first node's name for this section
    const firstNodeName = data[0]?.[0]?.name;

    // Lock/unlock functions
    const unlockNodeByName = useCallback((nodeNameToUnlock) => {
        setNodeLocks(prev => ({ ...prev, [nodeNameToUnlock]: false }));
    }, []);

    const lockNodeByName = useCallback((nodeNameToLock) => {
        if (nodeNameToLock === firstNodeName) return;
        setNodeLocks(prev => ({ ...prev, [nodeNameToLock]: true }));
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
                    className="tree-section-row"
                    style={{flexDirection: directionToFlex[direction][1]}}
                >
                    {subsection.map((nodeData, i) => (
                        <Node
                            key={nodeData.name ?? i}
                            nodeData={nodeData}
                            increaseTotal={increaseTotal}
                            decreaseTotal={decreaseTotal}
                            points={pointFuncts["points"]}
                            total={total}
                            locked={!!nodeLocks[nodeData.name] || (nodeData.pointLock > 0 && total < nodeData.pointLock)}
                            unlockNodeByName={unlockNodeByName}
                            lockNodeByName={lockNodeByName}
                            highlight={highlight}
                            direction={direction}
                            openNodeName={openNodeName}
                            setOpenNodeName={setOpenNodeName}
                        />
                    ))}
                </div>
            ))}
            <div className="tree-section-summary" style={{flexDirection: directionToFlex[direction][1]}}>
                <div className="tree-section-summary-inner">
                    <h2 style={{ color: highlight }}>{name.toUpperCase()}</h2>
                    <h2 style={{ color: highlight }}>{total}</h2>
                </div>
            </div>
        </div>
    );
}

export default TreeSection;