'use client';

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { FlashIcon, Clock01Icon, SecurityLockIcon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui";

const TRUST_BULLETS = [
    { icon: CheckmarkCircle02Icon, text: "Upfront pricing insights" },
    { icon: Clock01Icon, text: "Takes 60 seconds" },
    { icon: SecurityLockIcon, text: "100% No obligation" },
]

export default function QuizEstimate({ estimate, onContinue }: { estimate: { lo: string, hi: string }, onContinue: () => void }) {
    return (
        <div className="flex flex-col px-6 py-8 gap-5">

            {/* fast estimate badge */}
            <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    <HugeiconsIcon icon={FlashIcon} strokeWidth={2.5} className="size-3.5" />
                    YOUR ESTIMATED RESULT
                </span>
            </div>

            <p className="text-center text-sm text-muted-foreground">
                Based on your answers, your estimated range is:

            </p>
            <p className="text-center text-4xl font-black text-black">
                {estimate.lo}–{estimate.hi}
            </p>

            <Separator />

            <p className="text-center text-xs text-muted-foreground ">
                This is a ballpark estimate based on the information you provided.
                A final price may vary after a plumber reviews your current water heater, location, access, materials, permits, code requirements, and any additional work needed.

            </p>

            {/* trust bullets */}
            <ul className="flex flex-col gap-2.5 bg-gray-100 rounded-lg">
                {TRUST_BULLETS.map(({ icon, text }) => (
                    <QuizTrustBullet key={text} icon={icon} text={text} />
                ))}
            </ul>

            <Button className="w-full" size="lg" onClick={onContinue}>
                Get a More Precise Quote

            </Button>
        </div>
    );
}
function QuizTrustBullet({ icon, text }: { icon: IconSvgElement, text: string }) {
    return (
        <li className="flex items-center gap-2.5 text-sm px-4 py-2.5 border-b last:border-b-0 border-gray-200
         font-medium text-foreground">
            <HugeiconsIcon icon={icon} strokeWidth={2} className="size-5 shrink-0" />
            {text}
        </li>
    );
}