import { useEffect, useRef } from 'react';

// eslint-disable-next-line no-undef
export const useEvent = <Event extends keyof GlobalEventHandlersEventMap>(
    event: Event,
    // eslint-disable-next-line unused-imports/no-unused-vars, no-undef
    handler: (event: GlobalEventHandlersEventMap[Event]) => void
) => {
    const handlerReference = useRef(handler);

    // Update handlerRef.current value if handler changes.
    useEffect(() => {
        handlerReference.current = handler;
    }, [handler]);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const stableHandler = (_event: GlobalEventHandlersEventMap[Event]) =>
            handlerReference.current(_event);

        // Add event listener
        document.addEventListener(event, stableHandler);

        return () => {
            // Remove event listener on cleanup
            document.removeEventListener(event, stableHandler);
        };
    }, [event]); // Only re-run the effect if event changes
};
