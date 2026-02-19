import { useLayoutEffect } from "react";

export default function useAnchorPosition(visible, anchorRef, setPos) {
    useLayoutEffect(() => {
        if (visible && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPos({
                top: rect.top + window.scrollY + 8,
                left: rect.right + window.scrollX + rect.width
            });
        }
    }, [visible, anchorRef]);
}