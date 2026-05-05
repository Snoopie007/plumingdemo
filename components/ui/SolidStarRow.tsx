import { cn } from "@/lib/utils";

type SolidStarRowProps = {
    className?: string;
    sizeClassName?: string;
};

function StarSvg({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn("shrink-0", className)}
            aria-hidden
        >
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.274c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.274-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function SolidStarRow({ className, sizeClassName }: SolidStarRowProps) {
    return (
        <div className={cn("flex gap-0.5 text-amber-300", className)} aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
                <StarSvg key={i} className={sizeClassName} />
            ))}
        </div>
    );
}

export { SolidStarRow };