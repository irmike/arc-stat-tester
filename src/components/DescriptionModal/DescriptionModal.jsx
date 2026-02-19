import React, { useLayoutEffect, useState } from "react";
import {createPortal} from "react-dom";
import "./DescriptionModal.css";

function DescriptionModal({ visible, onClose, children, anchorRef, style }) {
    const [pos, setPos] = useState({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (visible && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPos({
                top: rect.top + window.scrollY + 8,
                left: rect.right + window.scrollX + rect.width / 2
            });
        }
    }, [visible, anchorRef]);

    // Always render, but hide/show with style
    return createPortal(
        <div className="description-popover"
             style={{
                 position: "absolute",
                 top: pos.top,
                 left: pos.left,
                 zIndex: 1000,
                 ...style
             }}>
            <div className="description-content" role="dialog" aria-modal="false">
                <button className="description-close" onClick={onClose} aria-label="Close description">✕</button>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default DescriptionModal;
