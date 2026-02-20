import { useLayoutEffect } from "react";

export default function useAnchorPosition(visible, anchorRef, setPos) {
    useLayoutEffect(() => {
        if (visible && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            const modalWidth = 320; // Default modal width in px
            let left = rect.right + window.scrollX;
            // If modal would overflow right edge, shift left
            if (left + modalWidth > window.innerWidth) {
                left = window.innerWidth - modalWidth - 8; // 8px padding from edge
                if (left < 0) left = 8; // Prevent negative left
            }
            setPos({
                top: rect.top + window.scrollY + 8,
                left
            });
        }
    }, [visible, anchorRef]);
}