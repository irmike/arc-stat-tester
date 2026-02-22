/*
 * ErrorModal.jsx - Displays an error modal for invalid actions or input.
 * Not currently used - Node + and - buttons do not appear until pointlock is met.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import { useState, useEffect, useRef } from "react";
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
            contentClassName="modal-content"
            popUpHeader="Error"
            buttonClassName={"modal-close"}
            onClose={handleClose}
        >
            {children}
        </PortalPopover>
    );
}

export default ErrorModal;

// Example usage in Node.jsx. Note that the error modal is currently not used, as the + and - buttons do not appear
// until the point lock is met. If you want to use it, you would need to adjust the logic to show the buttons but
// disable them when point lock conditions are not met, and then show the error modal on click.
//
// const [errorVisible, setErrorVisible] = useState(false);
//
// if (total < pointLock) {setErrorVisible(true);
// return;}
//
// <ErrorModal
//     visible={errorVisible}
//     anchorRef={buttonRef}
//     onHide={() => setErrorVisible(false)}
// >
//     <p>You need at least {pointLock} total points in this section to unlock this node.</p>
// </ErrorModal>
