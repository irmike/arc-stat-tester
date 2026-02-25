/*
 * Tree.jsx - Renders the main skill tree structure and layout.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import {useCallback, useMemo, useState} from "react";
import usePanAndZoom from "../../hooks/usePanAndZoom";
import PointsHeader from "../PointsHeader/PointsHeader.jsx";
import TreeSection from "../TreeSection/TreeSection.jsx";
import mobility from "../../data/mobilityData.js";
import conditioning from "../../data/conditioningData.js";
import survival from "../../data/survivalData.js";
import "./Tree.css";

function Tree() {
    const {
        scale,
        pan,
        isDragging,
        containerRef,
        treeInnerRef
    } = usePanAndZoom();

    // Points state lives with the Tree feature
    const defaultPoints = 76;
    const [points, setPoints] = useState(defaultPoints);
    const increasePoints = useCallback(() => setPoints(p => p + 1), []);
    const decreasePoints = useCallback(() => setPoints(p => Math.max(0, p - 1)), []);

    const pointFuncts = useMemo(
        () => ({ points, increasePoints, decreasePoints }),
        [points, increasePoints, decreasePoints]
    );

    // Expeditions logic
    const handleExpeditionsTotalChange = useCallback((expeditionsTotal) => {
        setPoints(defaultPoints + expeditionsTotal);
    }, []);

    const sectLimit = '200px';

    return (
        <div className={`tree-wrapper ${isDragging ? 'dragging' : ''}`} ref={containerRef}>
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
                <div className="tree-root">
                    <div className="tree-top" style={{ maxWidth: sectLimit }}>
                        <TreeSection name="Mobility" direction="up" data={mobility} pointFuncts={pointFuncts} />
                    </div>
                    <div className="tree-sides" style={{ maxHeight: sectLimit }}>
                        <div className="tree-side">
                            <TreeSection name="Conditioning" direction="left" data={conditioning} pointFuncts={pointFuncts} />
                        </div>
                        <div className="tree-side">
                            <TreeSection name="Survival" direction="right" data={survival} pointFuncts={pointFuncts} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tree;

