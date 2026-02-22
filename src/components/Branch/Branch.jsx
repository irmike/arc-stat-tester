/*
 * Branch.jsx - Renders SVG lines (branches) between connected nodes in the tree.
 * Not currently used or fully implemented.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import React from 'react';

const Branch = ({ source, target }) => {
    const pathData = `M ${source.x} ${source.y} C ${source.x} ${target.y} ${target.x} ${source.y} ${target.x} ${target.y}`;

    return (
        <path d={pathData} fill="transparent" stroke="black" />
    );
};

export default Branch;
