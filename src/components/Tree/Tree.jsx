/*
 * Tree.jsx - Renders the main skill tree structure and layout.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import TreeSection from "../TreeSection/TreeSection.jsx";
import mobility from "../../data/mobilityData.js";
import conditioning from "../../data/conditioningData.js";
import survival from "../../data/survivalData.js";
import "./Tree.css";

function Tree({ pointFuncts }) {
    const sectLimit = '200px';

    return (
        <>
            <div className="tree-root">
                <div className="tree-top" style={{maxWidth: sectLimit}}>
                    <TreeSection name="Mobility" direction="up" data={mobility} pointFuncts={pointFuncts}/>
                </div>
                <div className="tree-sides" style={{maxHeight: sectLimit}}>
                    <div className="tree-side">
                        <TreeSection name="Conditioning" direction="left" data={conditioning} pointFuncts={pointFuncts}/>
                    </div>
                    <div className="tree-side">
                        <TreeSection name="Survival" direction="right" data={survival} pointFuncts={pointFuncts}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tree;