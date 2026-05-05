"use client";

import * as React from "react";
import {
    addDays,
    addMonths,
    endOfWeek,
    format,
    isBefore,
    isSameDay,
    startOfDay,
    startOfMonth,
    startOfWeek,
    isAfter,
} from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    FilterIcon,
    Search01Icon,
} from "@hugeicons/core-free-icons";

import Link from "next/link";

import {
    Button,
    Empty,
    EmptyDescription, EmptyHeader, EmptyTitle,
    Card,
    CardContent,
    Skeleton,
} from "@/components/ui/";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/forms";
import { cn, startOfToday, weekDaysFor, toUserLocalTime } from "@/lib/utils";
import { MappedSession } from "@/types/other";
import { useProgramSessions } from "@/hooks";





interface MobileScheduleBoardProps {
    userTimeZone: string;
}
export function MobileScheduleBoard({ userTimeZone }: MobileScheduleBoardProps) {

    const todayStart = startOfToday();
    const [search, setSearch] = React.useState("");
    const [selectedDate, setSelectedDateState] = React.useState(todayStart);
    const [monthAnchor, setMonthAnchor] = React.useState(startOfMonth(todayStart));
    const { weekStart } = React.useMemo(() => {

        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
        if (isAfter(selectedDate, weekEnd) || isBefore(selectedDate, weekStart)) {
            return {
                weekStart: startOfWeek(todayStart, { weekStartsOn: 0 }),
                weekEnd: endOfWeek(todayStart, { weekStartsOn: 0 }),
            };
        }
        return { weekStart, weekEnd };
    }, [selectedDate]);
    const { sessions, isLoading } = useProgramSessions(weekStart);

    const setSelectedDay = (day: Date) => {
        setSelectedDateState(day);
        setMonthAnchor(startOfMonth(day));
    };

    const canGoPrevMonth = isBefore(startOfMonth(todayStart), monthAnchor);

    const prevWeekTarget = isBefore(
        addDays(selectedDate, -7),
        todayStart
    ) ? todayStart : addDays(selectedDate, -7);
    const canGoPrevWeek = !isSameDay(selectedDate, prevWeekTarget);

    const weekDays = React.useMemo(
        () => weekDaysFor(selectedDate),
        [selectedDate]
    );

    const filteredEvents = React.useMemo(() => {
        if (!sessions) return [];
        const trimmedSearch = search.trim().toLowerCase();
        return sessions.filter((s) => {
            if (!isSameDay(s.day, selectedDate)) return false;
            if (!trimmedSearch) return true;
            return (
                s.name.toLowerCase().includes(trimmedSearch) ||
                s.description.toLowerCase().includes(trimmedSearch)
            );
        });
    }, [sessions, selectedDate, search]);

    const shiftMonth = (delta: number) => {
        const nextMonth = startOfMonth(addMonths(monthAnchor, delta));
        const d = isBefore(nextMonth, todayStart) ? todayStart : nextMonth;
        setMonthAnchor(startOfMonth(d));
        setSelectedDateState(d);
    };

    const shiftWeek = (delta: number) => {
        const next = addDays(selectedDate, delta * 7);
        const d = isBefore(next, todayStart) ? todayStart : next;
        setSelectedDateState(d);
        setMonthAnchor(startOfMonth(d));
    };

    return (
        <div className="mx-auto w-full max-w-lg shadow-sm p-4 rounded-lg bg-white">

            <div className="flex flex-col gap-6 pt-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            className="shrink-0"
                            aria-label="Previous month"
                            disabled={!canGoPrevMonth}
                            onClick={() => shiftMonth(-1)}
                        >
                            <HugeiconsIcon
                                icon={ArrowLeft01Icon}
                                strokeWidth={2}
                                className="size-4"
                            />
                        </Button>
                        <span className="min-w-0 text-center text-sm font-semibold text-foreground">
                            {format(monthAnchor, "MMMM yyyy")}
                        </span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            className="shrink-0"
                            aria-label="Next month"
                            onClick={() => shiftMonth(1)}
                        >
                            <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                strokeWidth={2}
                                className="size-4"
                            />
                        </Button>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0 size-7 text-muted-foreground"
                            aria-label="Previous week"
                            disabled={!canGoPrevWeek}
                            onClick={() => shiftWeek(-1)}
                        >
                            <HugeiconsIcon
                                icon={ArrowLeft01Icon}
                                strokeWidth={2}
                                className="size-5"
                            />
                        </Button>
                        <div className="grid min-w-0 flex-1 grid-cols-7 gap-0.5 sm:gap-1">
                            {weekDays.map((day) => {
                                const active = isSameDay(day, selectedDate);
                                const disabled = isBefore(
                                    startOfDay(day),
                                    todayStart
                                );
                                return (
                                    <WeekDay
                                        key={day.toISOString()}
                                        day={day}
                                        active={active}
                                        disabled={disabled}
                                        onClick={() => {
                                            if (!disabled) setSelectedDay(day);
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="shrink-0 size-7 text-muted-foreground"
                            aria-label="Next week"
                            onClick={() => shiftWeek(1)}
                        >
                            <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                strokeWidth={2}
                                className="size-5"
                            />
                        </Button>
                    </div>
                </div>

                <div className="flex items-stretch gap-2">
                    <InputGroup className="h-11 min-h-11 flex-1">
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
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search schedule"
                        />
                    </InputGroup>
                    <Button
                        type="button"
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

                {isLoading ? (
                    <div className="flex flex-col gap-3 p-0 m-0">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ) : (

                    <div className="flex flex-col gap-3 p-0 m-0">
                        {filteredEvents.length === 0 ? (
                            <Empty className="h-full bg-muted/30">
                                <EmptyHeader>
                                    <EmptyTitle>No Classes Found</EmptyTitle>
                                    <EmptyDescription className="max-w-xs text-pretty">
                                        No classes found for this day.
                                    </EmptyDescription>
                                </EmptyHeader>

                            </Empty>
                        ) : (
                            filteredEvents.map((ev) => (
                                <ScheduleEventItem key={ev.id} session={ev} userTimeZone={userTimeZone} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}


interface WeekDayProps {
    day: Date;
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
}
function WeekDay({ day, active, disabled, onClick }: WeekDayProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center rounded-lg px-0.5 py-4 ",
                "font-medium transition-colors",
                disabled &&
                "cursor-not-allowed opacity-40 hover:bg-transparent hover:text-muted-foreground",
                active
                    ? "bg-primary text-primary-foreground"
                    : !disabled &&
                    "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
        >
            <span className="uppercase text-sm tabular-nums">
                {format(day, "EEE")}
            </span>
            <span className="text-sm tabular-nums">
                {format(day, "dd")}
            </span>
        </button>
    )
}

function ScheduleEventItem({ session, userTimeZone }: { session: MappedSession, userTimeZone: string }) {
    const { name, utcStartTime, utcEndTime, day, description } = session;


    const localStart = toUserLocalTime(utcStartTime, userTimeZone);
    const localEnd = toUserLocalTime(utcEndTime, userTimeZone);
    const localDay = toUserLocalTime(day, userTimeZone);

    const startTime = format(localStart, "p"); // 12-hour time with AM/PM
    const endTime = format(localEnd, "p");

    return (
        <Card className="gap-3 py-3 ring-foreground/10">
            <CardContent className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                    <div className="text-base font-semibold">
                        {name}
                    </div>
                    <p className="text-sm  leading-relaxed text-muted-foreground">
                        {startTime} - {endTime}, {format(localDay, "MMM d, yyyy")}
                    </p>

                    <div className=" pt-0">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                        <em>
                            Timezone: {userTimeZone}
                        </em>
                    </div>
                </div>
                <Link href={`/pricing`} >
                    <Button type="button"
                        className="shrink-0 text-xs px-3"
                    >
                        Join
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}