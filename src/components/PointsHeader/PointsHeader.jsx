import React from "react";
import "./PointsHeader.css";

function PointsHeader({ points }) {
    return (
        <h1 className="points-header">Points available: {points}</h1>
    );
}

export default PointsHeader;

