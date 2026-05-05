import { cn } from "@/lib/utils";
import { PrimaryCTAButton } from "../ui";
type Step = {
    title: string;
    description: string;
}
const STEPS: Step[] = [
    {
        title: "Download our free starter kit",
        description: "Download and get access to our starter kit. Get detail scoop about our martial art school, get details about our classes, pricing, schedules, and tour of our campus. Plus get access to exclusive online promotions!",
    },
    {
        title: "Join us on an assessment class",
        description: "Come join us for an assessment class. Our instructor will work with you or your kids to figure out which program will help you reach your goal.",
    },
    {
        title: "Sign up for one of our programs",
        description: "If you love what we have to offer, and think we can help you or your child achieve your goals, let us know and we will enroll you into the program that fits you best.",
    },
] as const;

export function HowtoStartSection({ className }: { className?: string }) {
    return (
        <section className={cn("relative isolate w-full overflow-hidden bg-muted/40 py-16", className)}>
            <div className="mx-auto w-full max-w-lg  space-y-8 rounded-xl border border-border/60 bg-card px-6 py-8 shadow-md sm:p-8">

                <div className="space-y-4 text-center">
                    <h2 className="font-sans text-4xl font-black text-black">How to get started</h2>
                    <p className="mt-1  leading-relaxed text-muted-foreground">
                        Like what you see so far? Here is how you can get more information about our programs, pricing, schedules, as well as how to get started.
                    </p>
                </div>
                <ol className="flex flex-col">
                    {STEPS.map((step, index) => (
                        <StepItem key={step.title} step={step} index={index} />
                    ))}
                </ol>
                <div className="flex justify-center">
                    <PrimaryCTAButton />
                </div>
            </div>
        </section>
    );
}



function StepItem({ step, index }: { step: Step, index: number }) {
    return (
        <li className="flex gap-4 ">
            <div className="flex flex-col items-center">
                <div className={cn(
                    "flex size-10 shrink-0 items-center justify-center ",
                    "rounded-full bg-primary font-sans  text-lg font-bold text-white"
                )} aria-hidden >
                    {index + 1}
                </div>
                <div className=" mt-2 w-px min-h-14 flex-1 bg-gray-200 " aria-hidden />
            </div>
            <div className={cn(
                "min-w-0 flex-1 pt-1",
                index === 2 ? "pb-0" : "pb-6"
            )}>
                <h3 className="font-semibold text-black text-lg leading-tight mb-3">{step.title}</h3>
                <p className="mt-1 text-sm  leading-relaxed text-muted-foreground">
                    {step.description}
                </p>
            </div>
        </li>
    );
}