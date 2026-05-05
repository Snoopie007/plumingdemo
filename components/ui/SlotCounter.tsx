"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Clip height per digit row; align with parent `text-*` / line-height (e.g. `text-4xl` + `leading-none`). */
const DIGIT_REM = 2.5;

type SlotCounterProps = {
    value: number;
    className?: string;
    digitClassName?: string;
    /** Total spin duration (seconds) for each column. */
    duration?: number;
    /** Delay between columns (seconds). */
    stagger?: number;
    /** Animate only the first time the block enters the viewport. */
    once?: boolean;
    /** Insert commas (e.g. 5,200). Comma is not animated. */
    showCommas?: boolean;
};

function SlotDigit({
    digit,
    delay,
    duration,
    animate,
    digitClassName,
}: {
    digit: number;
    delay: number;
    duration: number;
    animate: boolean;
    digitClassName?: string;
}) {
    return (
        <div
            className="inline-block w-[1ch] min-w-[0.6em] overflow-hidden tabular-nums"
            style={{ height: `${DIGIT_REM}rem` }}
        >
            <motion.div
                className="flex flex-col"
                initial={{ y: 0 }}
                animate={{ y: animate ? `${-digit * DIGIT_REM}rem` : 0 }}
                transition={{
                    duration,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {Array.from({ length: 10 }, (_, n) => (
                    <span
                        key={n}
                        className={cn(
                            "flex items-center justify-center font-bold leading-none",
                            digitClassName
                        )}
                        style={{ height: `${DIGIT_REM}rem`, minHeight: `${DIGIT_REM}rem` }}
                    >
                        {n}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

type SlotCell = { type: "digit"; d: number } | { type: "comma" };

export function SlotCounter({
    value,
    className,
    digitClassName,
    duration = 1.35,
    stagger = 0.07,
    once = true,
    showCommas = true,
}: SlotCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, amount: 0.3 });

    const formatted = showCommas
        ? Math.max(0, Math.floor(value)).toLocaleString("en-US")
        : String(Math.max(0, Math.floor(value)));

    const cells: SlotCell[] = [];
    for (const ch of formatted) {
        if (ch === ",") cells.push({ type: "comma" });
        else if (/\d/.test(ch)) cells.push({ type: "digit", d: Number(ch) });
    }

    let digitIndex = 0;

    return (
        <span
            ref={ref}
            className={cn("inline-flex items-end", className)}
            aria-label={Math.max(0, Math.floor(value)).toLocaleString("en-US")}
        >
            {cells.map((cell, i) => {
                if (cell.type === "comma") {
                    return (
                        <span
                            key={`c-${i}`}
                            className={cn("mx-0.5 translate-y-[-2px] font-bold", digitClassName)}
                            aria-hidden
                        >
                            ,
                        </span>
                    );
                }
                const di = digitIndex++;
                return (
                    <SlotDigit
                        key={`d-${i}-${di}`}
                        digit={cell.d}
                        delay={di * stagger}
                        duration={duration}
                        animate={isInView}
                        digitClassName={digitClassName}
                    />
                );
            })}
        </span>
    );
}
