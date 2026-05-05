import Image from "next/image";
import { Button, PrimaryCTAButton } from "../ui";
import { cn } from "@/lib/utils";


export function HeroSection() {
    const DummyData = {
        bgImage: "/images/hero-bg.webp",
        headline: "Best Martial Art School in Round Rock to Build Discipline and Leadership",
        description: "If you’re looking for the best Martial Arts School in Round Rock, then Look no further. Download our starter kit today to get access to our EXCLUSIVE offer! ",
        buttons: [
            {
                label: "Get Started",
                href: "/get-started",
                variant: "default" as const,
            },
            {
                label: "Learn More",
                href: "/learn-more",
                variant: "outline" as const,
            },
        ]
    }
    return (
        <section className={`relative isolate min-h-[85vh] w-full overflow-hidden`}>
            {/* Covered background: fill the section; object-cover = preserve ratio, crop overflow */}
            <Image src={DummyData.bgImage} alt="" loading="eager"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />
            {/* Optional scrim so text stays readable on busy photos */}
            <div className="absolute inset-0 bg-black/35" aria-hidden />

            <div className={`relative z-10 mx-auto flex min-h-[85vh]
             w-full max-w-4xl space-y-10 flex-col justify-center px-4 sm:px-6 lg:px-8`}>
                <div className="text-center space-y-4">
                    <h1 className="text-6xl font-sans uppercase font-black text-white">
                        {DummyData.headline}
                    </h1>
                    <p className="text-xl font-sans text-white">
                        {DummyData.description}
                    </p>

                </div>
                <div className="flex flex-row gap-4 justify-center">
                    <PrimaryCTAButton />
                    <Button variant="outline" size="lg"
                        className="border-2 border-white text-white font-black uppercase text-lg h-15 px-10">
                        Download Starter Kit
                    </Button>
                </div>
            </div>
        </section>
    );
}
