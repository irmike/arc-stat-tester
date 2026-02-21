/*
 * Node.jsx - Renders a tree node with image, count, and unlock logic.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import {useEffect, useState, useRef, createElement} from "react";
import DescriptionModal from "../DescriptionModal/DescriptionModal.jsx";
import ErrorModal from '../ErrorModal/ErrorModal.jsx';
import "./Node.css";

function Node ({
    nodeData,
    increaseTotal,
    decreaseTotal,
    points,
    total,
    locked,
    registerLockSetter,
    unregisterLockSetter,
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
    const [isLocked, setIsLocked] = useState(Boolean(locked || (pointLock > 0)));
    const [errorVisible, setErrorVisible] = useState(false);

    // Derived values
    const isDescOpen = openNodeName === name;
    const defaultColor = "darkgray";
    const color = count > 0 ? highlight : defaultColor;

    // Register/unregister lock setter
    useEffect(() => {
        if (!registerLockSetter || !unregisterLockSetter) return;
        registerLockSetter(name, setIsLocked);
        return () => unregisterLockSetter(name);
    }, [name, registerLockSetter, unregisterLockSetter]);

    // Handlers
    const increaseCount = () => {
        // Only increment if unlocked
        if (isLocked || points <= 0 || count >= pointCap) return;

        // only add if pointLock conditions are met, otherwise show error
        // Node code by Mi c h a e l Cr o w l e y
        if (total < pointLock) {
            setErrorVisible(true);
            return;
        }

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

            <ErrorModal
                visible={errorVisible}
                anchorRef={buttonRef}
                onHide={() => setErrorVisible(false)}
            >
                <p>You need at least {pointLock} total points in this section to unlock this node.</p>
            </ErrorModal>

            <div className="stat-display">
                { !isLocked && (
                    <span>
                        <button onClick={decreaseCount} aria-label={`Decrease ${name}`}> - </button>
                    </span>
                )}
                <span>
                    <h2>{count}/{pointCap}</h2>
                </span>
                { !isLocked && (
                    <span>
                        <button onClick={increaseCount} aria-label={`Increase ${name}`}> + </button>
                    </span>
                )}
            </div>
        </div>
    );
}

export default Node;

// M i c h a e lC r o w ley
