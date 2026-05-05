import { cn } from "@/lib/utils";
import { testimonials } from "@/app/Constants";
import { TestimonialCard } from "@/components/Sections/TestimonialCard";



export function TestimonialsSection({ className }: { className?: string }) {
    return (
        <section className={cn("relative w-full  py-16", className)}>
            <div className="mx-auto w-full max-w-6xl ">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-sans text-4xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
                        Why the Pasadena Community Seven Star Martial Arts
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground">
                        Five-star reviews from families training at our school.
                    </p>
                </div>

                <div className="mt-10 columns-1 gap-x-4 sm:columns-2 lg:columns-3">
                    {testimonials.map((item) => (
                        <TestimonialCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
