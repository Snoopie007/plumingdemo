import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRightIcon } from "@hugeicons/core-free-icons";;
import type { QuizOption } from "@/types/quiz";
type QuizOptionProps = {
    isSelected: boolean;
    option: QuizOption;
    onSelect: (value: string) => void;
}
export default function QuizOption({ isSelected, option, onSelect }: QuizOptionProps) {
    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={() => onSelect(option.value)}
                className={cn(
                    "group flex w-full items-center gap-3 rounded-lg border",
                    "border-border px-4 py-3 text-left text-sm font-semibold",
                    "transition-all active:scale-[0.98]",
                    "hover:border-primary hover:bg-primary/5",
                    isSelected && "border-primary bg-primary/8"
                )}
            >
                {option.icon && (
                    <HugeiconsIcon icon={option.icon} strokeWidth={2} className="size-5 shrink-0" />
                )}
                <span className="flex-1">{option.label}</span>
                <HugeiconsIcon icon={ArrowRightIcon}
                    strokeWidth={2}
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                />
            </button>
        </div>
    );
}