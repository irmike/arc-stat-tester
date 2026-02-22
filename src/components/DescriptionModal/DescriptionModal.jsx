/*
 * DescriptionModal.jsx - Displays a modal with node details and positions it near the anchor.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import { useState } from "react";
import "./DescriptionModal.css";
import useAnchorPosition from "../../hooks/useAnchorPosition.jsx";
import PortalPopover from "../common/PortalPopover.jsx";

function DescriptionModal({ visible, onClose, children, anchorRef }) {
    const [pos, setPos] = useState({ top: 0, left: 0 });

    useAnchorPosition(visible, anchorRef, setPos);

    return (
        <PortalPopover
            visible={visible}
            pos={pos}
            popUpClassName="description-popover"
            contentClassName="modal-content"
            buttonClassName="modal-close"
            onClose={onClose}
        >
            {children}
        </PortalPopover>
    );
}

export default DescriptionModal;
