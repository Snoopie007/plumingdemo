import Link from "next/link";
import { Button } from "./button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleArrowRight02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const buttonSize = {
    lg: "h-15 px-10 border-2 border-white  font-black uppercase text-xl",
    default: "h-12 px-8 border-2 border-white  font-black uppercase text-lg",
    sm: "h-12 px-4 font-black uppercase text-lg",
    xs: "h-8 px-4 border-2 border-white  font-black uppercase text-sm",
}


export function PrimaryCTAButton({ size = "lg" }: { size?: "lg" | "default" | "sm" | "xs" }) {
    return (
        <Link href="/get-started" prefetch={false}>
            <Button variant="default" size={size} className={cn("bg-primary cursor-pointer italic text-white", buttonSize[size])}>
                <span>
                    Get Started
                </span>
                <HugeiconsIcon icon={CircleArrowRight02Icon} className="size-6" />
            </Button>
        </Link>
    )
}