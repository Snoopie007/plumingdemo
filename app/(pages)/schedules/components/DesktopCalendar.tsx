"use client";

import * as React from "react";
import {
    addDays,
    differenceInMinutes,
    format,
    isBefore,
    isSameDay,
} from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    FilterIcon,
    Search01Icon,
} from "@hugeicons/core-free-icons";

import { Button, TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/forms";
import { cn } from "@/lib/utils";
import { MappedSession } from "@/types/other";
import { useProgramSessions } from "@/hooks/useProgramSessions";
import { weekDaysFor, startOfToday, toUserLocalTime } from "@/lib/utils";
import { useMemo } from "react";




function eventMinutesOnDay(s: MappedSession, which: "start" | "end") {
    const d = which === "start" ? s.utcStartTime : s.utcEndTime;
    const date = new Date(d);
    return date.getHours() * 60 + date.getMinutes();
}

function eventLayout(s: MappedSession, dayStartHour: number, dayEndHour: number, pxPerHour: number) {
    const startM = eventMinutesOnDay(s, "start");
    const endM = eventMinutesOnDay(s, "end");
    if (startM === null || endM === null || endM <= startM) return null;

    const gridStartM = dayStartHour * 60;
    const gridEndM = dayEndHour * 60;
    const clampedStart = Math.max(startM, gridStartM);
    const clampedEnd = Math.min(endM, gridEndM);
    if (clampedEnd <= gridStartM || clampedStart >= gridEndM) return null;

    /** Row centers are on the hour; labels are `items-center`, so top of row = half-hour before. */
    const top = ((clampedStart - gridStartM) / 60) * pxPerHour + pxPerHour / 2;
    const height = Math.max(((clampedEnd - clampedStart) / 60) * pxPerHour, 22);
    return { top, height };
}

const EVENT_STYLES = [
    "bg-pink-100/95 text-pink-950 ring-1 ring-pink-200/80",
    "bg-sky-100/95 text-sky-950 ring-1 ring-sky-200/80",
    "bg-violet-100/95 text-violet-950 ring-1 ring-violet-200/80",
    "bg-amber-100/95 text-amber-950 ring-1 ring-amber-200/80",
    "bg-emerald-100/95 text-emerald-950 ring-1 ring-emerald-200/80",
    "bg-orange-100/95 text-orange-950 ring-1 ring-orange-200/80",
];

function paletteClass(id: string) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) % 256;
    return EVENT_STYLES[h % EVENT_STYLES.length];
}

function formatTimeLabel(hour: number) {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    return format(d, "h a");
}

const DAY_START_HOUR = 7;
const DAY_END_HOUR = 24;
const PIXELS_PER_HOUR = 65;
const HOUR_COUNT = DAY_END_HOUR - DAY_START_HOUR;

/**
 * Hour bands are `PIXELS_PER_HOUR` tall. The guide line is drawn at the vertical
 * **center** of each band so it lines up with `items-center` time labels (8 AM ――――――――).
 */
function dayColumnGridStyle(pxPerHour: number): React.CSSProperties {
    const h = pxPerHour;
    const mid = h / 2;
    return {
        minHeight: HOUR_COUNT * h,
        backgroundImage: `repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent calc(${mid}px - 0.5px),
      rgba(15, 23, 42, 0.08) calc(${mid}px - 0.5px),
      rgba(15, 23, 42, 0.08) calc(${mid}px + 0.5px),
      transparent calc(${mid}px + 0.5px),
      transparent ${h}px
    )`};
}

interface DesktopScheduleBoardProps {
    userTimeZone: string;
}

export function DesktopScheduleBoard({ userTimeZone }: DesktopScheduleBoardProps) {

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const { sessions, isLoading } = useProgramSessions(selectedDate);
    const [search, setSearch] = React.useState("");

    const todayStart = startOfToday();
    const weekDays = React.useMemo(() => weekDaysFor(selectedDate), [selectedDate]);

    const canGoPrevWeek = useMemo(() => !isBefore(addDays(selectedDate, -6), new Date()), [selectedDate]);

    const shiftWeek = (delta: number) => {
        if (delta === -1 && !canGoPrevWeek) return;
        const next = addDays(selectedDate, delta * 7);
        setSelectedDate(next);
    };

    const filteredSessions = React.useMemo(() => {
        if (!sessions) return [];
        const trimmedSearch = search.trim().toLowerCase();
        return sessions.filter((s) => {
            if (!trimmedSearch) return true;
            return (
                s.name.toLowerCase().includes(trimmedSearch) ||
                s.description.toLowerCase().includes(trimmedSearch)
            );
        });
    }, [sessions, selectedDate, search]);

    const rangeLabel = `${format(weekDays[0], "MMM d")} – ${format(weekDays[6], "MMM d, yyyy")}`;

    const hours = React.useMemo(() => Array.from(
        { length: HOUR_COUNT },
        (_, i) => DAY_START_HOUR + i
    ), []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center ">
                <div className="flex border border-gray-200 rounded-lg p-2 items-center">
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Previous week"
                        disabled={!canGoPrevWeek}
                        onClick={() => shiftWeek(-1)}
                    >
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            strokeWidth={2}
                            className="size-4"
                        />
                    </Button>
                    <div className="min-w-[200px] text-center items-center text-sm font-semibold text-foreground sm:text-sm">
                        {rangeLabel}
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Next week"
                        onClick={() => shiftWeek(1)}
                    >
                        <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            strokeWidth={2}
                            className="size-4"
                        />
                    </Button>
                </div>
                <div className="flex  gap-2">
                    <InputGroup className="h-11 min-h-11 flex-1 bg-transparent rounded-lg">
                        <InputGroupAddon align="inline-start" className="pl-3">
                            <HugeiconsIcon
                                icon={Search01Icon}
                                strokeWidth={2}
                                className="size-4 text-muted-foreground"
                            />
                        </InputGroupAddon>
                        <InputGroupInput
                            placeholder="Search…"
                            value={search}
                            className="placeholder:text-sm text-sm"
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search schedule"
                        />
                    </InputGroup>
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-11 shrink-0"
                        aria-label="Filter (coming soon)"
                    >
                        <HugeiconsIcon
                            icon={FilterIcon}
                            strokeWidth={2}
                            className="size-4"
                        />
                    </Button>
                </div>
            </div>



            <div className="w-full border border-gray-200 rounded-lg p-2 shadow-xs flex flex-row">
                <div className="pr-2">
                    <div className="self-stretch h-[60px]" />
                    {hours.map((h) => (
                        <div key={h}
                            className="flex items-center justify-end pr-1.5 text-xs font-medium tabular-nums leading-none text-muted-foreground"
                            style={{ height: PIXELS_PER_HOUR }}
                        >
                            {formatTimeLabel(h)}
                        </div>
                    ))}
                </div>
                <div className="flex-1">
                    <div className="grid gap-x-2 gap-y-0 grid-cols-7">
                        {weekDays.map((day) => {
                            const isToday = isSameDay(day, todayStart);
                            return (
                                <WeekDayHeader key={day.toISOString()} day={day} isToday={isToday} />
                            );
                        })}

                    </div>
                    <div className="grid grid-cols-7  " >
                        {weekDays.map((day) => (
                            <div key={day.toISOString()}
                                className={'relative '}
                                style={dayColumnGridStyle(PIXELS_PER_HOUR)}
                            >
                                {filteredSessions.map((s) => {
                                    if (!isSameDay(s.day, day)) return null;
                                    const layout = eventLayout(s, DAY_START_HOUR, DAY_END_HOUR, PIXELS_PER_HOUR);

                                    if (!layout) return null;
                                    return (
                                        <WeekDayEvent key={s.id} session={s} layout={layout} userTimeZone={userTimeZone} />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function WeekDayHeader({ day, isToday }: { day: Date; isToday: boolean }) {
    return (
        <div className="bg-gray-100 rounded-lg px-1 h-[60px] flex flex-col items-center justify-center text-center">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {format(day, "EEE")}
            </div>
            <div className={cn("text-xl font-black tabular-nums",
                isToday && "text-primary")} >
                {format(day, "d")}
            </div>
        </div>
    );
}



interface WeekDayEventProps {
    session: MappedSession;
    layout: { top: number; height: number };
    userTimeZone: string;
}
function WeekDayEvent({ session, layout, userTimeZone }: WeekDayEventProps) {
    const { name, utcStartTime, utcEndTime } = session;

    const truncatedName = name.length > 15 ? name.slice(0, 15) + "..." : name;

    const duration = differenceInMinutes(utcEndTime, utcStartTime);
    const localStart = toUserLocalTime(utcStartTime, userTimeZone);
    const localEnd = toUserLocalTime(utcEndTime, userTimeZone);
    const isTooShort = duration < 45;
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={cn(
                        "absolute inset-x-px overflow-hidden rounded-sm flex items-center  px-2 py-2 ",
                        isTooShort ? "py-0" : "",
                        paletteClass(session.id)
                    )}
                    style={{ top: layout.top, height: layout.height, }}
                >
                    <div className="space-y-1">
                        <div className="text-[13px] font-semibold leading-tight">
                            {truncatedName}
                        </div>
                        {!isTooShort && (
                            <div className="text-xs text-muted-foreground leading-tight">
                                {format(localStart, "p")} - {format(localEnd, "p")}
                            </div>
                        )}

                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <div className="space-y-1">
                    <b className="text-sm font-semibold leading-tight">{truncatedName}</b>
                    <div>{format(localStart, "p")} - {format(localEnd, "p")}</div>
                </div>
            </TooltipContent>
        </Tooltip>

    );
}