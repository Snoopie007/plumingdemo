
import { GoogleMapEmbed } from "@/components/Shared";
import { PrimaryCTAButton } from "@/components/ui/PrimaryCTAButton";
import Image from "next/image";


const FooterCTA = {
    title: "More Confidence. More Focus. Shed Weight Download Our Free Starter Kit Today.",
    description: "Download and get access to our starter kit which includes details on our program, which program is right for you or your kids, pricing, schedules, tour of our campus, and special promotions.",
};

export function BottomCTASection() {

    return (
        <section className="relative w-full ">
            <Image
                src={'/images/footercta.webp'}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />
            {/* Optional scrim so text stays readable on busy photos */}
            <div className="absolute inset-0 bg-black/35" aria-hidden />
            <div
                className="relative z-0 isolate w-full overflow-hidden"
                style={{
                    clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 10rem), 50% 100%, 0 calc(100% - 10rem))",
                    // Avoids a 1px compositing seam at clip edges; opening DevTools repaints and
                    // often hid the same artifact before this hint.
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                }}
            >
                <div className="h-[50vh] w-full">
                    <GoogleMapEmbed title="School location map" query="Seven Star Martial Arts, Round Rock, TX" />
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8 text-center">

                <h2 className="mt-2 font-sans text-6xl font-black uppercase tracking-tight text-white sm:text-4xl">
                    {FooterCTA.title}
                </h2>
                <p className="mt-4 text-center text-lg  leading-relaxed text-white">
                    {FooterCTA.description}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap justify-center items-center">
                    <PrimaryCTAButton size="lg" />

                </div>
            </div>
        </section>
    );
}
