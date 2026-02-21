/*
 * PointsHeader.jsx - Displays the points header and manages expedition points.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import React, { useState } from "react";
import "./PointsHeader.css";
import Expeditions from "../Expeditions/Expeditions.jsx";

function PointsHeader({ points, onExpeditionsTotalChange }) {
    const [expeditions, setExpeditions] = useState([]);

    // Handlers
    const handleAdd = () => {
        if (expeditions.length < 5) {
            const newExpeditions = [...expeditions, 0];
            setExpeditions(newExpeditions);
            onExpeditionsTotalChange(newExpeditions.reduce((sum, v) => sum + v, 0));
        }
    };

    const handleRemove = idx => {
        const newExpeditions = expeditions.filter((_, i) => i !== idx);
        setExpeditions(newExpeditions);
        onExpeditionsTotalChange(newExpeditions.reduce((sum, v) => sum + v, 0));
    };

    const handleChange = (idx, value) => {
        if (isNaN(value) || value < 0 || value > 5){
            return;
        }
        const newExpeditions = expeditions.map((v, i) => (i === idx ? value : v));
        setExpeditions(newExpeditions);
        onExpeditionsTotalChange(newExpeditions.reduce((sum, v) => sum + v, 0));
    };

    return (
        <div className="points-header-root">
            <h1 className="points-header">Points available: {points}</h1>
            <Expeditions
                expeditions={expeditions}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onChange={handleChange}
            />
        </div>
    );
}

export default PointsHeader;
