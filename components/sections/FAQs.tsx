
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type FAQ = {
    id: string;
    question: string;
    answer: string;
}

const FAQS: FAQ[] = [
    {
        id: "emergency",
        question: "Do you offer emergency plumbing services?",
        answer:
            "Yes. We're available 24/7 for burst pipes, major leaks, sewer backups, and other emergencies. Call us any time and we'll dispatch a technician as quickly as possible.",
    },
    {
        id: "pricing",
        question: "How does your pricing work?",
        answer:
            "We provide upfront, flat-rate pricing before any work begins — no surprises on your final bill. Use our online estimate tool to get a ballpark range in under a minute.",
    },
    {
        id: "water-heater",
        question: "How do I know if I need to repair or replace my water heater?",
        answer:
            "Units under 8–10 years old with a single issue are usually good candidates for repair. Older units, repeated problems, or rising energy bills typically point to replacement. We'll give you an honest recommendation on-site.",
    },
    {
        id: "tankless",
        question: "Is a tankless water heater worth it?",
        answer:
            "For most homes, yes. Tankless units provide unlimited hot water on demand and can reduce water heating costs by 20–30%. We'll walk you through the payback period based on your household size and usage.",
    },
    {
        id: "arrival",
        question: "How soon can a plumber arrive?",
        answer:
            "For non-emergency appointments we typically offer same-day or next-day availability. Emergency calls are prioritized and we'll give you an honest ETA when you call.",
    },
    {
        id: "permit",
        question: "Do you pull permits for installations?",
        answer:
            "Yes. All work that requires a permit — including water heater replacements and re-pipes — is properly permitted and inspected. This protects your home and keeps your insurance valid.",
    },
    {
        id: "guarantee",
        question: "Do you guarantee your work?",
        answer:
            "All labor comes with a workmanship guarantee. Parts and equipment also carry manufacturer warranties. If something isn't right after we leave, we'll come back and make it right.",
    },
    {
        id: "prepare",
        question: "What should I do before the plumber arrives?",
        answer:
            "Clear a path to the affected area and know where your main water shut-off valve is located. For water heater appointments, make sure the area around the unit is accessible.",
    },
];

function FaqColumn({
    items,
    className,
}: {
    items: typeof FAQS;
    className?: string;
}) {
    return (
        <Accordion type="single" collapsible className={cn("w-full  border-none space-y-2", className)}>
            {items.map((item) => (
                <AccordionItem key={item.id} value={item.id} className={cn(
                    "bg-black text-white p-2 rounded-lg",
                    " data-open:text-black ",
                    "**:data-[slot=accordion-trigger-icon]:size-5",
                    "**:data-[slot=accordion-trigger-icon]:text-white",
                    "data-open:**:data-[slot=accordion-trigger-icon]:text-black",

                )}>
                    <AccordionTrigger className=" font-bold text-lg items-center">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base/relaxed">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export function FAQsSection() {
    const mid = Math.ceil(FAQS.length / 2);
    const left = FAQS.slice(0, mid);
    const right = FAQS.slice(mid);

    return (
        <section className="w-full py-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-center font-sans text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    Got questions? We've got answers.
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground ">
                    Common questions about our plumbing services, pricing, and what to expect.
                    Reach out if you don&apos;t see what you need.
                </p>
                <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
                    <FaqColumn items={left} />
                    <FaqColumn items={right} />
                </div>
            </div>
        </section>
    );
}
