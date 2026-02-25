/*
 * Node.jsx - Renders a tree node with image, count, and unlock logic.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import {useState, useRef, createElement} from "react";
import DescriptionModal from "../DescriptionModal/DescriptionModal.jsx";
import "./Node.css";

function Node ({
    nodeData,
    increaseTotal,
    decreaseTotal,
    points,
    total,
    locked,
    unlockNodeByName,
    lockNodeByName,
    highlight,
    openNodeName,
    setOpenNodeName
}) {
    // Destructure node data
    const { name, description, pointCap, pointLock, unlocks = [], image} = nodeData;

    // Refs
    const buttonRef = useRef(null);

    // States
    const [count, setCount] = useState(0);

    // Derived values
    const isDescOpen = openNodeName === name;
    const defaultColor = "darkgray";
    const color = count > 0 ? highlight : defaultColor;

    // Handlers
    const increaseCount = () => {
        // Only increment if unlocked
        if (locked || points <= 0 || count >= pointCap || total < pointLock) return;

        if (count === 0) {
            for (const unlockName of unlocks) {
                unlockNodeByName?.(unlockName);
            }
        }

        setCount(prev => prev + 1);
        increaseTotal();
    };

    const decreaseCount = () => {
        if (count > 0) {
            // If this click will make count go from 1 -> 0, lock targets
            if (count === 1) {
                for (const unlockName of unlocks) {
                    lockNodeByName?.(unlockName);
                }
            }
            setCount(prevCount => prevCount - 1);
            decreaseTotal();
        }
    };

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
                { !locked && (
                    <>
                        <button onClick={decreaseCount} aria-label={`Decrease ${name}`}> - </button>
                    </>
                )}
                <>
                    <h2>{count}/{pointCap}</h2>
                </>
                { !locked && (
                    <>
                        <button onClick={increaseCount} aria-label={`Increase ${name}`}> + </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Node;

// M i c h a e lC r o w ley
