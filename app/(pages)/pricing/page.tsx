
import { location } from "@/app/Constants/PageContent";
import { LeadForm } from "@/components/forms/LeadForm";
import { testimonials } from "@/app/Constants";
import { TestimonialCard } from "@/components/Sections/TestimonialCard";
import { cn } from "@/lib/utils";

export default function PricingPage({ className }: { className?: string }) {
    const { name, address, phone, email } = location;
    const { line1, city, state, zip, country } = address;
    return (
        <section className={cn("relative w-full bg-muted ", className)}>
            <div className={cn("mx-auto  max-w-4xl  pb-6  py-20")}>

                <div className="text-center text-black w-3xl mx-auto mb-16">
                    <p className="text-sm text-primary font-bold">Looking For Our Pricing?</p>
                    <h2 className="text-4xl font-sans font-black mb-2">
                        Tell us what program you’re looking for below
                    </h2>

                    <p className="text-base font-roboto">
                        Fill out the form below, and one of our coaches will send you our pricing, class schedule, and EXLCUSIVE promo information for our classes.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-16">
                    <div className="col-span-1">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <LeadForm locationName={location.name} />
                        </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                        <div>
                            {testimonials.slice(0, 2).map((testimonial) => (
                                <TestimonialCard key={testimonial.id} item={testimonial} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}