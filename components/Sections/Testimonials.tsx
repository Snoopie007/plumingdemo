import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import type { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        name: "Maria Gonzalez",
        location: "ClearFlow Plumbing",
        avatarSrc: "https://i.pravatar.cc/128?img=32",
        text: "My water heater went out on a Sunday morning. They had a tech out within two hours and the new unit was installed before noon. Incredible response time.",
    },
    {
        id: "2",
        name: "James Patterson",
        location: "ClearFlow Plumbing",
        avatarSrc: "https://i.pravatar.cc/128?img=12",
        text: "Clear upfront pricing with no surprise charges at the end. The technician explained everything before starting and finished faster than estimated.",
    },
    {
        id: "3",
        name: "Priya Nair",
        location: "ClearFlow Plumbing",
        avatarSrc: "https://i.pravatar.cc/128?img=45",
        text: "We had a slow leak under the kitchen sink for weeks. They found the source immediately, fixed it cleanly, and even checked the rest of the pipes under the house.",
    },
    {
        id: "4",
        name: "Chris Delgado",
        location: "ClearFlow Plumbing",
        avatarSrc: "https://i.pravatar.cc/128?img=15",
        text: "Switched to a tankless water heater based on their recommendation. The install was spotless and our energy bill dropped noticeably the next month.",
    },
    {
        id: "5",
        name: "Hannah Brooks",
        location: "ClearFlow Plumbing",
        avatarSrc: "https://i.pravatar.cc/128?img=9",
        text: "Called three plumbers before these guys. They were the only ones who actually showed up on time, diagnosed the problem correctly the first time, and didn't upsell me.",
    },
    {
        id: "6",
        name: "Marcus Webb",
        location: "ClearFlow Plumbing",
        avatarSrc: "https://i.pravatar.cc/128?img=68",
        text: "Professional from start to finish. The tech wore boot covers, laid down drop cloths, and left the utility room cleaner than he found it.",
    },
];

export function TestimonialsSection({ className }: { className?: string }) {
    return (
        <section className={cn("relative w-full py-16", className)}>
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-sans text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                        What our customers are saying
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Five-star reviews from homeowners across the Austin area.
                    </p>
                </div>

                <div className="mt-10 columns-1 gap-x-4 sm:columns-2 lg:columns-3">
                    {TESTIMONIALS.map((item) => (
                        <TestimonialCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
