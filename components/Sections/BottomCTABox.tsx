
import { PrimaryCTAButton } from "@/components/ui/PrimaryCTAButton";
import { cn } from "@/lib/utils";
import Image from "next/image";


const FooterCTA = {
    title: "More Confidence. More Focus. Shed Weight Download Our Free Starter Kit Today.",
    description: "Download and get access to our starter kit which includes details on our program, which program is right for you or your kids, pricing, schedules, tour of our campus, and special promotions.",
};

export function BottomCTABox({ className }: { className?: string }) {

    return (
        <section className={cn("relative w-full py-16", className)}>


            <div className="relative mx-auto w-full max-w-6xl py-20 px-10 rounded-xl overflow-hidden text-center">
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
                <div className="relative z-10 mx-auto max-w-4xl">
                    <h2 className="mt-2 font-sans text-6xl font-black uppercase tracking-tight text-white sm:text-4xl">
                        {FooterCTA.title}
                    </h2>
                    <p className="mt-4 text-center text-lg text-white">
                        {FooterCTA.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap justify-center items-center">
                        <PrimaryCTAButton size="lg" />

                    </div>
                </div>
            </div>
        </section>
    );
}
