import { cn } from "@/lib/utils";
import type { QuizProgressProps } from "@/types/quiz";

export default function QuizProgress({ activeIndex, totalActive }: QuizProgressProps) {
  return (
    <div className="mt-4 space-y-1.5">
      <div className="flex gap-1.5">
        {Array.from({ length: totalActive }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              i <= activeIndex ? "bg-primary" : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <p className="text-right text-xs font-medium tabular-nums text-gray-500">
        Step {activeIndex + 1} of {totalActive}
      </p>
    </div>
  );
}
