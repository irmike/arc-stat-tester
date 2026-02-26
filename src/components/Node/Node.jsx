/*
 * Node.jsx - Renders a tree node with image, count, and unlock logic.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

// --- Imports ---
import { useRef, useState, createElement } from "react";
import DescriptionModal from "../DescriptionModal/DescriptionModal.jsx";
import "./Node.css";

// --- Main Component ---
function Node({
    nodeData,
    points,
    total,
    locked,
    unlockNodeByName,
    lockNodeByName,
    highlight,
    openNodeName,
    setOpenNodeName,
    spendPoints,
    refundPoints,
    onSectionTotalChange
}) {
    // --- Node Data ---
    const { name, description, pointCap, pointLock, unlocks = [], image } = nodeData;

    // --- Local State ---
    const [count, setCount] = useState(0);
    const buttonRef = useRef(null);

    // --- Derived Values ---
    const isDescOpen = openNodeName === name;
    const defaultColor = "darkgray";
    const color = count > 0 ? highlight : defaultColor;

    // --- Handlers ---
    const increaseCount = () => {
        if (locked || points <= 0 || count >= pointCap || total < pointLock) return;
        if (count === 0) {
            for (const unlockName of unlocks) {
                unlockNodeByName?.(unlockName);
            }
        }
        setCount(c => c + 1);
        spendPoints?.();
        onSectionTotalChange?.(1);
    };

    const decreaseCount = () => {
        if (count <= 0) return;
        if (count === 1) {
            for (const unlockName of unlocks) {
                lockNodeByName?.(unlockName);
            }
        }
        setCount(c => Math.max(0, c - 1));
        refundPoints?.();
        onSectionTotalChange?.(-1);
    };

    // --- Render ---
    return (
        <div className={`node-root${pointLock > 0 ? " node-large" : ""}`}>
            <button
                ref={buttonRef}
                className="node-image-button"
                onClick={e => { e.stopPropagation(); setOpenNodeName(isDescOpen ? null : name); }}
                aria-label={`Open Description for ${name}`}
            >
                {image && (
                    createElement(image, {
                        className: `node-image${pointLock > 0 ? " image-large" : ""} node-${name}`,
                        alt: name,
                        style: { color }
                    })
                )}
            </button>

            <DescriptionModal
                visible={isDescOpen}
                onClose={() => setOpenNodeName(null)}
                anchorRef={buttonRef}
            >
                <h2>{name}</h2>
                <p>{description}</p>
            </DescriptionModal>

            <div className="stat-display">
                {!locked && (
                    <button onClick={decreaseCount} aria-label={`Decrease ${name}`}> - </button>
                )}

                <h2>{count}/{pointCap}</h2>

                {!locked && (
                    <button onClick={increaseCount} aria-label={`Increase ${name}`}> + </button>
                )}
            </div>
        </div>
    );
}

export default Node;
