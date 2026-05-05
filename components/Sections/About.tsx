import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Fire02Icon } from "@hugeicons/core-free-icons";

/** Swap this for any icon from `@hugeicons/core-free-icons`, or replace the list markup with `<img src="/icons/your-bullet.svg" />`. */

export function AboutUsSection() {
    const DummyData = {
        bgImage: "/images/hero-bg.webp",
        headline: "Best Martial Art School in Round Rock to Build Discipline and Leadership",
        description: [
            "Whether you’re focused on fitness, self-improvement, or self-defense, Seven Star Martial Arts in Round Rock is your destination. At Seven Star we believe martial arts is not just for fitness but rather a skill that can unite the Round Rock community.",
            "Join our martial arts school and you will quickly gain essential self-defense skills, followed by invigorating workouts and personal growth. Join our Round Rock martial arts school now for a transformative journey. Experience the power of martial arts within our inclusive and vibrant community.",
        ],
        bullets: [
            {
                title: "High Quality Values",
                body: "Through our martial arts program we help students acquire greater self-esteem, self-control, respect and humility.",
            },
            {
                title: "Personal Development",
                body: "You will be taught and encouraged by our professional trainers while moving at your own pace.",
            },
            {
                title: "Accessible & Enjoyable",
                body: "We offer programs accessible & enjoyable by people of any ages.",
            },
        ] as const,
    };

    return (
        <section className="relative isolate w-full overflow-hidden py-20">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-10">
                <div className="relative h-full min-h-64 w-full overflow-hidden rounded-lg md:min-h-0">
                    <Image
                        src={DummyData.bgImage}
                        alt={''}
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
                        <div className="space-y-4 font-roboto text-lg ">
                            {DummyData.description.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>
                        {DummyData.bullets.length > 0 ? (
                            <ul className="mt-6 list-none space-y-4 p-0">
                                {DummyData.bullets.map((item) => (
                                    <li key={item.title}
                                        className="flex gap-3  text-lg text-black"
                                    >
                                        <HugeiconsIcon
                                            icon={Fire02Icon}
                                            strokeWidth={2}
                                            className="mt-0.5 size-6 shrink-0 text-orange-600"
                                            aria-hidden
                                        />
                                        <p className="min-w-0 leading-relaxed  text-black">
                                            <span className="font-bold">
                                                {item.title}
                                            </span>
                                            <span className="">{" "} - {item.body}
                                            </span>
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
