import React from "react";
import {useEffect, useState, useRef} from "react";
import DescriptionModal from "../DescriptionModal/DescriptionModal.jsx";
import "./Node.css";


function Node ({
    nodeData,
    increaseTotal,
    decreaseTotal,
    points,
    locked,
    registerLockSetter,
    unregisterLockSetter,
    unlockNodeByName,
    lockNodeByName,
    highlight,
    direction,
    openNodeName,
    setOpenNodeName
}) {
    const { name, description, pointCap, pointLock, unlocks = [], image } = nodeData;
    const [count, setCount] = useState(0);
    const buttonRef = useRef(null);

    const defaultColor = "darkgray";
    // Remove color state and useEffect. Compute color directly.
    const color = count > 0 ? highlight : defaultColor;

    const [isLocked, setIsLocked] = useState(Boolean(locked || (pointLock > 0)));

    useEffect(() => {
        if (!registerLockSetter || !unregisterLockSetter) return;
        registerLockSetter(name, setIsLocked);
        return () => unregisterLockSetter(name);
    }, [name, registerLockSetter, unregisterLockSetter]);

    // Remove local isDescOpen state
    // Use openNodeName and setOpenNodeName from props
    const isDescOpen = openNodeName === name;

    const increaseCount = () => {
        // Only allow increment if unlocked
        if (isLocked || points <= 0 || count >= pointCap) return;

        // If this click will make count go from 0 -> 1, unlock targets
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
        <div className="node-root">
            <button
                ref={buttonRef}
                className="node-image-button"
                onClick={e => { e.stopPropagation(); setOpenNodeName(isDescOpen ? null : name); }}
                aria-label={`Open Description for ${name}`}
            >
                {image && (
                    React.createElement(image, {
                        className: "node-image node-" + name,
                        alt: name,
                        style: { color }
                    })
                )}
            </button>

            <DescriptionModal
                isOpen={true}
                visible={isDescOpen}
                onClose={() => setOpenNodeName(null)}
                anchorRef={buttonRef}
                direction={direction}
                style={{ display: isDescOpen ? 'block' : 'none' }}
            >
                <h2>{name}</h2>
                <p>{description}</p>
            </DescriptionModal>

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