/*
 * Tree.jsx - Renders the main skill tree structure and layout.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

// --- Imports ---
import { useCallback, useMemo, useReducer } from "react";
import usePanAndZoom from "../../hooks/usePanAndZoom";
import PointsHeader from "../PointsHeader/PointsHeader.jsx";
import TreeSection from "../TreeSection/TreeSection.jsx";
import mobility from "../../data/mobilityData.js";
import conditioning from "../../data/conditioningData.js";
import survival from "../../data/survivalData.js";
import "./Tree.css";

// --- Main Component ---
function Tree() {
    // --- Pan & Zoom State ---
    const {
        scale,
        pan,
        isDragging,
        containerRef,
        treeInnerRef
    } = usePanAndZoom();

    // --- Points State & Reducer ---
    const defaultPoints = 76;

    // Helper: Calculate available points
    const calcPointsAvailable = (basePoints, expeditions, spentPoints) => {
        const expeditionsTotal = expeditions.reduce((sum, v) => sum + v, 0);
        return {
            expeditionsTotal,
            pointsAvailable: Math.max(0, basePoints + expeditionsTotal - spentPoints)
        };
    };

    // Reducer state shape
    const initialState = {
        basePoints: defaultPoints,
        expeditions: [],
        spentPoints: 0
    };

    // Reducer: Handles points and expeditions
    function reducer(state, action) {
        switch (action.type) {
            case 'SPENT_INC': {
                const spentPoints = state.spentPoints + 1;
                return { ...state, spentPoints };
            }
            case 'SPENT_DEC': {
                const spentPoints = Math.max(0, state.spentPoints - 1);
                return { ...state, spentPoints };
            }
            case 'EXPEDITIONS_ADD': {
                if (state.expeditions.length >= 5) return state;
                return { ...state, expeditions: [...state.expeditions, 0] };
            }
            case 'EXPEDITIONS_REMOVE': {
                const idx = action.payload;
                return { ...state, expeditions: state.expeditions.filter((_, i) => i !== idx) };
            }
            case 'EXPEDITIONS_SET_VALUE': {
                const { idx, value } = action.payload;
                const expeditions = state.expeditions.map((v, i) => (i === idx ? value : v));
                return { ...state, expeditions };
            }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // Derived points
    const derived = useMemo(() => {
        return calcPointsAvailable(state.basePoints, state.expeditions, state.spentPoints);
    }, [state.basePoints, state.expeditions, state.spentPoints]);

    const pointsAvailable = derived.pointsAvailable;

    // --- Action Creators ---
    const spendPoints = useCallback(() => dispatch({ type: 'SPENT_INC' }), []);
    const refundPoints = useCallback(() => dispatch({ type: 'SPENT_DEC' }), []);
    const handleExpeditionsAdd = useCallback(() => dispatch({ type: 'EXPEDITIONS_ADD' }), []);
    const handleExpeditionsRemove = useCallback((idx) => dispatch({ type: 'EXPEDITIONS_REMOVE', payload: idx }), []);
    const handleExpeditionsChange = useCallback((idx, value) => {
        dispatch({ type: 'EXPEDITIONS_SET_VALUE', payload: { idx, value } });
    }, []);

    // --- Layout Constants ---
    const sectLimit = '200px';

    // --- Render ---
    return (
        <div className={`tree-wrapper ${isDragging ? 'dragging' : ''}`} ref={containerRef}>
            {/* Points header (global points + expeditions) */}
            <PointsHeader
                points={pointsAvailable}
                expeditions={state.expeditions}
                onAddExpedition={handleExpeditionsAdd}
                onRemoveExpedition={handleExpeditionsRemove}
                onChangeExpedition={handleExpeditionsChange}
            />
            {/* Tree layout with pan/zoom */}
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
                        <TreeSection
                            name="Mobility"
                            direction="up"
                            data={mobility}
                            points={pointsAvailable}
                            spendPoints={spendPoints}
                            refundPoints={refundPoints}
                        />
                    </div>
                    <div className="tree-sides" style={{ maxHeight: sectLimit }}>
                        <div className="tree-side">
                            <TreeSection
                                name="Conditioning"
                                direction="left"
                                data={conditioning}
                                points={pointsAvailable}
                                spendPoints={spendPoints}
                                refundPoints={refundPoints}
                            />
                        </div>
                        <div className="tree-side">
                            <TreeSection
                                name="Survival"
                                direction="right"
                                data={survival}
                                points={pointsAvailable}
                                spendPoints={spendPoints}
                                refundPoints={refundPoints}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tree;

