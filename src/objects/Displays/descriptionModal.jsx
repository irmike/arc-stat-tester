import React, { useEffect, useState } from "react";
import {createPortal} from "react-dom";
import "./descriptionModal.css";


function DescriptionModal({ isOpen, onClose, children, anchorRef}) {
    const [pos, setPos] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!isOpen || !anchorRef?.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        const top = rect.bottom + window.scrollY + 8;
        const left = rect.left + window.scrollX;
        setPos({ top, left });
    }, [isOpen, anchorRef]);

    if (!isOpen) return null;

    return createPortal(
        <div className="description-popover" style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 1000 }}>
            <div className="description-content" role="dialog" aria-modal="false">
                <button className="description-close" onClick={onClose} aria-label="Close description">✕</button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default DescriptionModal;
