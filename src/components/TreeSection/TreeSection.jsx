/*
 * TreeSection.jsx - Renders a section of the skill tree with its nodes and logic.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

// --- Imports ---
import { useCallback, useState } from "react";
import Node from "../Node/Node.jsx";
import "./TreeSection.css";

const directionToFlex = {
    "left": ["row-reverse", "column-reverse"],
    "right": ["row", "column"],
    "up": ["column-reverse", "row"]
};

const colorToHighlight = {
    "Survival": "red",
    "Mobility": "goldenrod",
    "Conditioning": "limegreen"
};

// --- Main Component ---
function TreeSection({ name, direction, data, points, spendPoints, refundPoints }) {
    // --- Section State ---
    const [total, setTotal] = useState(0);
    const [openNodeName, setOpenNodeName] = useState(null);

    // --- Node Locks ---
    const firstNodeName = data[0]?.[0]?.name;
    const [nodeLocks, setNodeLocks] = useState(() => {
        const locks = {};
        data.forEach(subsection => {
            subsection.forEach(node => {
                locks[node.name] = node.name !== firstNodeName;
            });
        });
        return locks;
    });

    // --- Lock/Unlock Handlers ---
    const unlockNodeByName = useCallback((nodeNameToUnlock) => {
        setNodeLocks(prev => ({ ...prev, [nodeNameToUnlock]: false }));
    }, []);

    const lockNodeByName = useCallback((nodeNameToLock) => {
        if (nodeNameToLock === firstNodeName) return;
        setNodeLocks(prev => ({ ...prev, [nodeNameToLock]: true }));
    }, [firstNodeName]);

    // --- Section Total Handler ---
    const handleSectionTotalChange = useCallback((delta) => {
        setTotal(prevTotal => Math.max(0, prevTotal + delta));
    }, []);

    // --- Section Highlight Color ---
    let highlight = colorToHighlight[name] || "darkgray";

    // --- Render ---
    return (
        <div className="tree-section" style={{ flexDirection: directionToFlex[direction][0] }}>
            {data.map((subsection, subSectionIndex) => (
                <div
                    key={subSectionIndex}
                    className="tree-section-row"
                    style={{ flexDirection: directionToFlex[direction][1] }}
                >
                    {subsection.map((nodeData, i) => (
                        <Node
                            key={nodeData.name ?? i}
                            nodeData={nodeData}
                            points={points}
                            total={total}
                            locked={!!nodeLocks[nodeData.name] || (nodeData.pointLock > 0 && total < nodeData.pointLock)}
                            unlockNodeByName={unlockNodeByName}
                            lockNodeByName={lockNodeByName}
                            highlight={highlight}
                            openNodeName={openNodeName}
                            setOpenNodeName={setOpenNodeName}
                            spendPoints={spendPoints}
                            refundPoints={refundPoints}
                            onSectionTotalChange={handleSectionTotalChange}
                        />
                    ))}
                </div>
            ))}
            <div className="tree-section-summary" style={{ flexDirection: directionToFlex[direction][1] }}>
                <div className="tree-section-summary-inner">
                    <h2 style={{ color: highlight }}>{name.toUpperCase()}</h2>
                    <h2 style={{ color: highlight }}>{total}</h2>
                </div>
            </div>
        </div>
    );
}

export default TreeSection;
