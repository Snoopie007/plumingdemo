"use client";

import { useSyncExternalStore } from "react";

/** Match header / schedule split: viewports ≤767px use the mobile UI. */
export const MOBILE_QUERY = "(max-width: 767px)";

function subscribeMobileQuery(onChange: () => void) {
    const mq = window.matchMedia(MOBILE_QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

function getIsMobileSnapshot() {
    return window.matchMedia(MOBILE_QUERY).matches;
}

/** Server snapshot: assume desktop until hydrated (avoids layout flash + hydration mismatch). */
export function useIsMobile() {
    return useSyncExternalStore(
        subscribeMobileQuery,
        getIsMobileSnapshot,
        () => false
    );
}
