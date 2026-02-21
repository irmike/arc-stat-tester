/*
 * PortalPopover.jsx - Utility for rendering popovers using React portals.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import { createPortal } from "react-dom";

export default function PortalPopover({ visible, pos, children, popUpClassName = '', contentClassName = '', buttonClassName, onClose,  popUpHeader}) {
    return createPortal(
        <div
            className={popUpClassName}
            style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                zIndex: 1000,
                display: visible ? 'block' : 'none'
            }}>
            <div className={contentClassName}>
                {onClose && <button className={buttonClassName} onClick={onClose} aria-label="Close">✕</button>}
                {popUpHeader && <h2>{popUpHeader}</h2>}
                {children}
            </div>
        </div>,
        document.body
    );
}