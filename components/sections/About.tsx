import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

export function AboutUsSection() {
    const DummyData = {
        bgImage: "/images/hero-bg.webp",
        headline: "Austin's Trusted Plumbing Team — Fast, Honest, and Done Right",
        description: [
            "ClearFlow Plumbing has served homeowners across the Austin area for over a decade. From water heater replacements and leak repairs to full re-pipes and drain clearing, our licensed technicians handle it all with upfront pricing and no surprises.",
            "We show up on time, explain the work before we start, and clean up when we're done. Whether it's an emergency or a planned upgrade, you can count on us to treat your home like our own.",
        ],
        bullets: [
            {
                title: "Licensed & Insured",
                body: "Every technician is fully licensed, background-checked, and insured so you can let us in with confidence.",
            },
            {
                title: "Upfront Flat-Rate Pricing",
                body: "You'll know the exact cost before we touch a single pipe — no hourly surprises, no hidden fees.",
            },
            {
                title: "Same-Day & Emergency Service",
                body: "We're available 24/7 for urgent jobs and offer same-day appointments for most standard service calls.",
            },
        ] as const,
    };

    return (
        <section className="relative isolate w-full overflow-hidden py-20">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-10">
                <div className="relative h-full min-h-64 w-full overflow-hidden rounded-lg md:min-h-0">
                    <Image
                        src={DummyData.bgImage}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="space-y-4 text-left">
                        <h1 className="font-sans text-5xl font-black uppercase text-black">
                            {DummyData.headline}
                        </h1>
                        <div className="space-y-4 font-roboto text-lg">
                            {DummyData.description.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>
                        {DummyData.bullets.length > 0 ? (
                            <ul className="mt-6 list-none space-y-4 p-0">
                                {DummyData.bullets.map((item) => (
                                    <li key={item.title} className="flex gap-3 text-lg text-black">
                                        <HugeiconsIcon
                                            icon={CheckmarkCircle02Icon}
                                            strokeWidth={2}
                                            className="mt-0.5 size-6 shrink-0 text-primary"
                                            aria-hidden
                                        />
                                        <p className="min-w-0 leading-relaxed text-black">
                                            <span className="font-bold">{item.title}</span>
                                            <span>{" "} — {item.body}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
