/*
 * Tree.jsx - Renders the main skill tree structure and layout.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import {useState, useLayoutEffect, useRef} from "react";
import TreeSection from "../TreeSection/TreeSection.jsx";
import mobility from "../../data/mobilityData.js";
import conditioning from "../../data/conditioningData.js";
import survival from "../../data/survivalData.js";
import "./Tree.css";

function Tree({ pointFuncts }) {
    const sectLimit = '200px';
    const [sideWidth, setSideWidth] = useState(null);

    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useLayoutEffect(() => {
        if (!leftRef.current || !rightRef.current) return;
        const updateWidth = () => {
            const maxWidth = Math.max(
                leftRef.current.offsetWidth,
                rightRef.current.offsetWidth
            );
            setSideWidth(maxWidth || null);
        };
        updateWidth();
        const observer = new ResizeObserver(updateWidth);
        observer.observe(leftRef.current);
        observer.observe(rightRef.current);
        return () => observer.disconnect();
        // Tree code by M i c ha e l C r o w l e y
    }, []);

    return (
        <>
            <div className="tree-root">
                <div className="tree-top" style={{maxWidth: sectLimit}}>
                    <TreeSection name="Mobility" direction="up" data={mobility} pointFuncts={pointFuncts}/>
                </div>
                <div className="tree-sides" style={{maxHeight: sectLimit}}>
                    <div ref={leftRef} className="tree-side" style={{width: sideWidth ? `${sideWidth}px` : 'auto'}}>
                        <TreeSection name="Conditioning" direction="left" data={conditioning}
                                     pointFuncts={pointFuncts}/>
                    </div>
                    <div ref={rightRef} className="tree-side" style={{width: sideWidth ? `${sideWidth}px` : 'auto'}}>
                        <TreeSection name="Survival" direction="right" data={survival} pointFuncts={pointFuncts}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tree;