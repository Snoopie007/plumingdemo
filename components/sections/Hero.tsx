import Image from "next/image";
import { Button } from "../ui";


export function HeroSection() {
    const DummyData = {
        bgImage: "/images/bg-pluming.jpg",
        headline: "Plumging You Can Count Online",
        description: "Fast, honest, and dependable water heater installation and repair services in Round Rock and Austin, TX.",
        buttons: [
            {
                label: "Get Started",
                href: "#",
                variant: "default" as const,
            },
            {
                label: "Schedule Online",
                href: "#",
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
            <div className="absolute inset-0 bg-black/60" aria-hidden />

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
                    <Button variant="default" size="lg" className="bg-primary border-2 border-primary cursor-pointer italic text-white h-12 hover:bg-primary/80">
                        Call 469-242-4695
                    </Button>
                    <Button variant="outline" size="lg"
                        className="border-2 border-white text-white font-black uppercase text-lg h-12 hover:bg-white hover:text-primary">
                        Schedule Online
                    </Button>
                </div>
            </div>
        </section>
    );
}
