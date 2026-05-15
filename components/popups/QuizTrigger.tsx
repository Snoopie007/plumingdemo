"use client";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calculator01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const layoutSpring = {
    type: "spring" as const,
    damping: 28,
    stiffness: 380,
    mass: 0.85,
};

const fadeShift = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

export default function QuizTrigger({ onClick }: { onClick: () => void }) {
    const isMobile = useIsMobile();
    const [desktopExpanded, setDesktopExpanded] = useState(true);
    const prefersReducedMotion = useReducedMotion();

    const layoutTransition = prefersReducedMotion ? { duration: 0.12 } : layoutSpring;
    const fadeTransition = prefersReducedMotion ? { duration: 0.08 } : fadeShift.transition;

    const showExpandedDesktop = !isMobile && desktopExpanded;
    const showCompact = isMobile || !desktopExpanded;

    return (
        <motion.div
            layout
            transition={layoutTransition}
            initial={false}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
            onClick={onClick}
            className={cn(
                "fixed z-40 cursor-pointer text-white shadow-2xl ring-2 ring-black/10",
                "bg-primary backdrop-blur-sm",
                isMobile &&
                "bottom-0 left-0 right-0 flex flex-row items-center justify-between gap-3 rounded-none  px-4 py-3",
                showExpandedDesktop &&
                "bottom-6 right-6 flex min-h-68 w-[280px] flex-col items-stretch gap-6 rounded-xl px-7 pb-8 pt-10",
                !isMobile &&
                showCompact &&
                "bottom-6 right-6 flex max-w-md flex-row items-center gap-4 rounded-xl px-5 py-4",
            )}
        >
            <AnimatePresence>
                {!isMobile && showExpandedDesktop && (
                    <motion.div
                        key="collapse-control"
                        layout
                        initial={{ opacity: 0, scale: 0.82 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.82 }}
                        transition={
                            prefersReducedMotion ? { duration: 0.06 } : { duration: 0.18 }
                        }
                        className="absolute right-2 top-2 z-10"
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-9 shrink-0 text-white hover:bg-white/15 hover:text-white"
                            aria-label="Collapse estimate banner"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDesktopExpanded(false);
                            }}
                        >
                            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                layout
                transition={layoutTransition}
                className={cn(
                    "flex min-w-0 flex-1 gap-3",
                    showExpandedDesktop ? "flex-col items-center text-center" : "flex-row items-center text-left",
                    isMobile && "flex-row items-center text-left",
                )}
            >
                <motion.div
                    layout
                    transition={layoutTransition}
                    animate={{
                        scale: showExpandedDesktop ? 1 : isMobile ? 0.92 : 0.94,
                    }}
                >
                    <HugeiconsIcon icon={Calculator01Icon} strokeWidth={2} className="size-10" />
                </motion.div>
                <div className={cn("flex min-w-0 flex-col", showExpandedDesktop ? "gap-1.5" : "gap-0.5")}>
                    <motion.div
                        layout
                        transition={layoutTransition}
                        className={cn(
                            "font-black leading-snug text-white",
                            showExpandedDesktop ? "text-xl tracking-tight sm:text-xl" : "text-sm",
                            isMobile && "text-xs",
                        )}
                    >
                        Instant Water Heater Estimate
                    </motion.div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={showExpandedDesktop ? "expanded-copy" : "compact-copy"}
                            initial={fadeShift.initial}
                            animate={fadeShift.animate}
                            exit={fadeShift.exit}
                            transition={fadeTransition}
                            className={cn(
                                "leading-snug text-white/85",
                                showExpandedDesktop ? "text-sm" : "text-xs",
                                isMobile && "text-[11px]",
                            )}
                        >
                            {showExpandedDesktop
                                ? "Get an instant online estimate in just 60 seconds. No commitment required, no contact information required."
                                : "See your price range in seconds."}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div
                layout
                transition={layoutTransition}
                className={cn("shrink-0", showExpandedDesktop && "w-full")}
            >
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "shrink-0 border-none bg-black font-black text-white hover:bg-black/90 hover:text-white/90",
                        showExpandedDesktop ? "h-12 w-full text-sm" : "h-10 px-4",
                        isMobile && "h-10 text-xs",
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    Get Started
                </Button>
            </motion.div>
        </motion.div>
    );
}
