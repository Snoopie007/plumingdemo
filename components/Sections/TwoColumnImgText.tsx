import Image from "next/image";
import { cn } from "@/lib/utils";
import { PrimaryCTAButton } from "../ui/PrimaryCTAButton";
interface TwoColumnImgTextProps {
    image: string;
    headline: string;
    description: string[];
    reverse?: boolean;
    className?: string;
}
export function TwoColumnImgText(props: TwoColumnImgTextProps) {
    const { image, headline, description, reverse = false, className } = props;
    return (
        <section className={cn("relative isolate w-full overflow-hidden py-26", className)}>
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-10">
                <div className="relative h-full min-h-64 w-full overflow-hidden rounded-lg md:min-h-0">
                    <Image
                        src={image}
                        alt={''}
                        fill
                        priority
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center"
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="space-y-4 text-left">
                        <h1 className="font-sans text-5xl font-black uppercase">
                            {headline}
                        </h1>
                        <div className="space-y-4 font-roboto text-lg ">
                            {description.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>

                    </div>
                    <div className="mt-4">
                        <PrimaryCTAButton />
                    </div>
                </div>
            </div>
        </section>
    );
}
