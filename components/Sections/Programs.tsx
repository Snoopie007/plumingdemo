import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Program = {
    id: string;
    name: string;
    description: string;
    image: string;
    showLearnMore?: boolean;
    learnMoreHref?: string;
};

const PROGRAMS: Program[] = [
    {
        id: "lil-dragon",
        name: "Lil Dragon",
        description:
            "Introduction to focus, coordination, and respect in a fun, age-appropriate class.",
        image: "/images/hero-bg.webp",
        showLearnMore: true,
        learnMoreHref: "/programs/lil-dragon",
    },
    {
        id: "kids",
        name: "Kids Martial Arts",
        description:
            "Build confidence and discipline with structured training and positive coaching.",
        image: "/images/hero-bg.webp",
        showLearnMore: false,
    },
    {
        id: "teens",
        name: "Teens",
        description:
            "Challenge-level skills, leadership, and fitness for teenage students.",
        image: "/images/hero-bg.webp",
        showLearnMore: true,
        learnMoreHref: "/programs/teens",
    },
    {
        id: "adults",
        name: "Adults",
        description:
            "Stress relief, fitness, and practical martial arts on your schedule.",
        image: "/images/hero-bg.webp",
        showLearnMore: true,
        learnMoreHref: "/programs/adults",
    },
    {
        id: "family",
        name: "Family plan",
        description: "Train together with flexible options for parents and siblings.",
        image: "/images/hero-bg.webp",
        showLearnMore: false,
    },
];

function ProgramCard({
    program,
    className,
    isFeaturedWide,
}: {
    program: Program;
    className?: string;
    /** First card on lg when program count is odd — 2-column span, wider `sizes` hint. */
    isFeaturedWide?: boolean;
}) {
    return (
        <article
            className={cn(
                "flex flex-col overflow-hidden  ",
                className,
            )}
        >
            <div className="relative h-[300px] w-full shrink-0">
                <Image
                    src={program.image}
                    alt=""
                    fill
                    sizes={
                        isFeaturedWide
                            ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
                            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover rounded-lg"
                />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 py-5">
                <h3 className="text-2xl uppercase font-sans text-primary range-600 font-black ">{program.name}</h3>
                <p className="text-sm/leading-relaxed text-zinc-300">{program.description}</p>
                <div className="flex justify-start">
                    {program.showLearnMore ? (
                        <Button
                            variant="outline"
                            asChild
                            className="bg-primary text-white h-10 text-base px-6 font-black  border-none"
                        >
                            <Link href={program.learnMoreHref ?? "#"} prefetch={false}>Learn more</Link>
                        </Button>
                    ) : null}
                </div>
            </div>
        </article>
    );
}

export function ProgramsSection() {
    const programCountOdd = PROGRAMS.length % 2 === 1;

    return (
        <section className="relative isolate w-full overflow-hidden bg-black py-16">
            <div className="mx-auto w-full max-w-6xl ">
                <div className="text-lg font-bold text-primary">Train with the best</div>
                <h2 className="mt-2 max-w-4xl font-sans text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Our programs that Round Rock love
                </h2>

                <div className="mt-12 grid grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {PROGRAMS.map((program, index) => (
                        <ProgramCard
                            key={program.id}
                            program={program}
                            isFeaturedWide={programCountOdd && index === 0}
                            className={cn(
                                programCountOdd && index === 0 && "lg:col-span-2",
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}