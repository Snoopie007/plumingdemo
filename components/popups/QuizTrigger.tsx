import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calculator01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function QuizTrigger({ onClick }: { onClick: () => void }) {
    const isMobile = useIsMobile();
    return (
        <div
            onClick={onClick}
            className={cn(
                "fixed bottom-6 right-6 z-40 flex gap-4 items-center flex-row rounded-lg px-6 py-3",
                "text-white shadow-2xl ring-2 border border-border transition-all duration-200",
                "bg-primary backdrop-blur-sm cursor-pointer justify-between",
                isMobile && "fixed bottom-0 right-0 left-0 border-0 py-4"
            )}
        >

            < div className="flex flex-row gap-2 items-center" >
                < HugeiconsIcon
                    icon={Calculator01Icon}
                    strokeWidth={2.1}
                    className="size-6 mt-0.5 shrink-0"
                />
                <div className="flex flex-col text-left">
                    <div className="text-xs font-bold leading-snug text-white">Instant Online Estimate</div>
                    <div className="text-xs text-white/80">See your price range in seconds.</div>
                </div>
            </div >
            <Button
                variant="outline"
                className="font-black bg-white border-none text-primary hover:bg-white/80 hover:text-primary/80"

            >
                Get Started
            </Button>
        </div>
    );
}
