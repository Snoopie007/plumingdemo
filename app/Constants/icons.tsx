
function TankIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <rect x="7" y="4" width="10" height="16" rx="2.5" />
            <line x1="9.5" y1="4" x2="9.5" y2="2" />
            <line x1="14.5" y1="4" x2="14.5" y2="2" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity={0.5} />
        </svg>
    );
}

function TanklessIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <line x1="8" y1="3" x2="8" y2="1.5" />
            <line x1="16" y1="3" x2="16" y2="1.5" />
            <line x1="12" y1="21" x2="12" y2="22.5" />
            <rect x="8" y="7" width="8" height="5" rx="1" fill="currentColor" stroke="none" opacity={0.2} />
            <line x1="9" y1="15" x2="15" y2="15" strokeWidth={1.2} />
            <line x1="9" y1="17" x2="15" y2="17" strokeWidth={1.2} />
        </svg>
    );
}



function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="16" y1="2" x2="16" y2="6" />
        </svg>
    );
}

function FlameIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <path d="M12 2C8 7 7 10 9 13c-2 0-3-1.5-3-1.5C6 17 9 22 12 22s6-3 6-7.5c0-2-1-3.5-2.5-4.5 0 0 0 2-1.5 3C16 10 14 5 12 2Z" />
        </svg>
    );
}

function DropIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <path d="M12 2 C12 2 5 10 5 15 A7 7 0 0 0 19 15 C19 10 12 2 12 2Z" />
        </svg>
    );
}

function PressureIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
        </svg>
    );
}

function OtherIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="size-7 shrink-0">
            <circle cx="12" cy="12" r="9" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="12" y1="8" x2="12" y2="16" />
        </svg>
    );
}

function ClockIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    );
}

function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12l3 3 5-5" />
        </svg>
    );
}
export {

    TankIcon, TanklessIcon, CalendarIcon, FlameIcon, DropIcon,
    PressureIcon, OtherIcon, ClockIcon, ChevronRightIcon, CheckCircleIcon
};