import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SolidStarRow } from "@/components/ui";
import { Testimonial } from "@/types";

function GoogleWordmark({ className }: { className?: string }) {
    return (
        <span
            className={className}
            aria-hidden
            style={{ fontFamily: "sans-serif", letterSpacing: "-0.02em" }}
        >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
        </span>
    );
}

export function TestimonialCard({ item }: { item: Testimonial }) {
    return (
        <article
            className="mb-6 break-inside-avoid rounded-2xl border border-border/60 bg-card px-5 py-4 "
            style={{ boxDecorationBreak: "clone" as const }}
        >
            <div className="flex gap-3">
                <Avatar size="lg" className="shrink-0">
                    <AvatarImage src={item.avatarSrc} alt="" />
                </Avatar>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug text-black">
                        <span className="font-semibold">{item.name}</span>
                        <span className="font-normal text-muted-foreground"> recommends </span>
                        <span >{item.location}</span>
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground">
                        <span>via</span> <GoogleWordmark className="text-[0.95em] font-semibold" />
                    </p>
                </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
                <span className="sr-only">5 out of 5 stars</span>
                <SolidStarRow sizeClassName="size-5 text-amber-400" />
            </div>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">{item.text}</p>
        </article>
    );
}