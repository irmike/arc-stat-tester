/*
 * PointsHeader.jsx - Displays the points header and manages expedition points.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import React from "react";
import "./PointsHeader.css";
import Expeditions from "../Expeditions/Expeditions.jsx";

function PointsHeader({ points, expeditions, onAddExpedition, onRemoveExpedition, onChangeExpedition }) {
    return (
        <div className="points-header-root">
            <h1 className="points-header">Points available: {points}</h1>
            <Expeditions
                expeditions={expeditions}
                onAdd={onAddExpedition}
                onRemove={onRemoveExpedition}
                onChange={onChangeExpedition}
            />
        </div>
    );
}

export default PointsHeader;
