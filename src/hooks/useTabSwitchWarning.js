import { useState, useEffect, useRef } from "react";

export default function useTabSwitchWarning({ maxWarnings = 3, onMaxExceeded } = {}) {
    const [switchCount, setSwitchCount] = useState(0);
    const [showWarningModal, setShowWarningModal] = useState(false);

    // Ref to always hold the latest onMaxExceeded callback
    const onMaxExceededRef = useRef(onMaxExceeded);

    useEffect(() => {
        onMaxExceededRef.current = onMaxExceeded;
    }, [onMaxExceeded]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setSwitchCount((prevCount) => {
                    const newCount = prevCount + 1;

                    if (newCount >= maxWarnings) {
                        setShowWarningModal(false); // Hide popup on 3rd attempt

                        // Execute the redirect callback immediately
                        if (typeof onMaxExceededRef.current === "function") {
                            onMaxExceededRef.current();
                        }
                    } else {
                        setShowWarningModal(true); // Show popup for 1st and 2nd attempt
                    }

                    return newCount;
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [maxWarnings]);

    const closeModal = () => setShowWarningModal(false);

    return { switchCount, showWarningModal, closeModal };
}