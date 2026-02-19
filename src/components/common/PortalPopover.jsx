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