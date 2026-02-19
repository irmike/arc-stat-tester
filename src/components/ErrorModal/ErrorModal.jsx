import React, { useState, useEffect, useRef } from "react";
import './ErrorModal.css';
import useAnchorPosition from "../../hooks/useAnchorPosition.jsx";
import PortalPopover from "../common/PortalPopover.jsx";

const ErrorModal = ({ visible, anchorRef, onHide, children }) => {
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const timerRef = useRef();
    const timeoutDuration = 4000;

    const handleClose = () => {
        clearTimeout(timerRef.current);
        if (onHide) onHide();
    };

    useAnchorPosition(visible, anchorRef, setPos);

    useEffect(() => {
        if (visible) {
            timerRef.current = setTimeout(() => {
                if (onHide) onHide();
            }, timeoutDuration);
        }
        return () => clearTimeout(timerRef.current);
    }, [visible, onHide]);

    return (
        <PortalPopover
            visible={visible}
            pos={pos}
            popUpClassName="error-modal-overlay"
            contentClassName="error-content"
            popUpHeader="Error"
            buttonClassName={"error-close"}
            onClose={handleClose}
        >
            {children}
        </PortalPopover>
    );
}

export default ErrorModal;
