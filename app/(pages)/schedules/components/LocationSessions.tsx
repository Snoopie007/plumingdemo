"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DesktopScheduleBoard } from "./DesktopCalendar";
import { MobileScheduleBoard } from "./MobileCalendar";

const queryClient = new QueryClient();

export function LocationSessions() {
    const userTimeZone =
        typeof Intl !== "undefined" &&
            Intl.DateTimeFormat().resolvedOptions().timeZone
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : "UTC";

    const isMobile = useIsMobile();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="mx-auto max-w-7xl">
                {isMobile ? (
                    <MobileScheduleBoard
                        userTimeZone={userTimeZone}
                    />
                ) : (
                    <DesktopScheduleBoard
                        userTimeZone={userTimeZone}
                    />
                )}
            </div>
        </QueryClientProvider>
    );
}