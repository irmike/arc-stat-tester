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
            contentClassName="description-content"
            buttonClassName="description-close"
            onClose={onClose}
        >
            {children}
        </PortalPopover>
    );
}

export default DescriptionModal;
