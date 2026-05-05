
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
        id: "age",
        question: "What ages do you accept?",
        answer:
            "We offer programs for children, teens, and adults. Specific age ranges vary by class—contact us or book a tour and we’ll recommend the best fit.",
    },
    {
        id: "trial",
        question: "Do you offer a trial class?",
        answer:
            "Yes. Many families start with an assessment or trial class so you can meet the instructors and see how classes are structured before enrolling.",
    },
    {
        id: "schedule",
        question: "How often are classes held?",
        answer:
            "Schedules depend on the program. We typically offer multiple days and times per week; you’ll get a clear schedule when you enroll or during your visit.",
    },
    {
        id: "uniform",
        question: "What should I wear to my first class?",
        answer:
            "Comfortable athletic clothing is fine for a trial. If you join, we’ll go over uniform or dress expectations for your specific program.",
    },
    {
        id: "experience",
        question: "Do I need prior martial arts experience?",
        answer:
            "No. Our curriculum is designed for beginners through advanced students. Instructors meet you where you are and help you progress safely.",
    },
    {
        id: "pricing",
        question: "How does pricing work?",
        answer:
            "Pricing varies by program and membership options. We’re happy to walk through plans, discounts, and family options in person or over the phone.",
    },
    {
        id: "safety",
        question: "How do you keep classes safe?",
        answer:
            "Safety is central to training: controlled drills, clear rules, appropriate pacing, and instructors who correct form and etiquette throughout class.",
    },
    {
        id: "visit",
        question: "Can I visit the school before signing up?",
        answer:
            "Absolutely. Tours and introductory visits are welcome so you can see the space, ask questions, and get a feel for our community.",
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
                    Quick answers about classes, trials, and getting started. Reach out if
                    you don&apos;t see what you need.
                </p>
                <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
                    <FaqColumn items={left} />
                    <FaqColumn items={right} />
                </div>
            </div>
        </section>
    );
}