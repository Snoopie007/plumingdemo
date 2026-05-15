"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { DocumentValidationIcon, Call02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export type QuizSuccessProps = {
    firstName: string;
    estimateLow: string;
    estimateHigh: string;
    companyPhone: string;
    telHref: string;
};

export default function QuizSuccess({
    firstName,
    estimateLow,
    estimateHigh,
    companyPhone,
    telHref,
}: QuizSuccessProps) {
    return (
        <div className="flex max-h-[min(85vh,640px)] flex-col gap-4 overflow-y-auto px-6 py-8">
            <div className="flex justify-center">
                <HugeiconsIcon
                    icon={DocumentValidationIcon}
                    strokeWidth={2}
                    className="size-12 shrink-0 text-green-600"
                    aria-hidden
                />
            </div>

            <h2 className="text-center text-xl font-black leading-snug text-foreground">
                Thanks, {firstName}  Your Quote Request Received
            </h2>
            <p className="text-center text-sm text-muted-foreground">
                A team member will review your details and follow up with you to confirm your options.
            </p>



            <p className="text-center text-sm leading-relaxed ">
                <b>  ${estimateLow} – ${estimateHigh}</b> is a ballpark estimate, not a final quote. Final pricing may vary after we review your current water heater,
                fuel type, location, access, code requirements, materials, permits, and any additional work needed.
            </p>



            <div className="mt-2 space-y-2 rounded-lg bg-muted/50 px-4 py-4">
                <p className="text-center text-sm font-bold text-foreground">Need help right away?</p>
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    If your water heater is leaking or you have no hot water, call us now:
                </p>
                <p className="text-center text-lg font-black tabular-nums text-foreground"></p>
                <Button asChild className="w-full" size="lg">
                    <div>
                        <HugeiconsIcon
                            icon={Call02Icon}
                            strokeWidth={2}
                            className="size-5 shrink-0 text-white"
                            aria-hidden
                        />
                        <span> {companyPhone}</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}
