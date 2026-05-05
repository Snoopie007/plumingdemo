import { FAQsSection, TestimonialsSection } from "@/components/Sections";
import { ContactForm } from "./components/ContactForm";
import { location } from "@/app/Constants/PageContent";
import Link from "next/link";


export default function ContactPage() {
    const { name, address, phone, email } = location;
    const { line1, city, state, zip, country } = address;
    return (
        <section className="relative w-full ">
            <div className="mx-auto  max-w-5xl  pb-6  py-20">

                <div className="text-center text-black w-3xl mx-auto mb-16">
                    <p className="text-sm text-amber-600 font-bold">Got a Question?</p>
                    <h2 className="text-2xl font-sans font-black mb-2">Contact {location.name}</h2>

                    <p className="text-base font-roboto">
                        We’re here to help and answer any question you might have.
                        <br />
                        We look forward to hearing from you.
                        <br />
                        🙂
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-16">
                    <div className="col-span-1">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <ContactForm locationName={location.name} />
                        </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h4 className=" font-bold mb-2">How can we help you today?</h4>
                            <p className=" text-sm text-muted-foreground">
                                Your feedback is important to us please let us know how best we can help you.
                                Submit the form above (on mobile) or to the left (on desktop) and we will get back to you within 48 business hour.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h4 className=" font-bold mb-2">Our Locations</h4>
                            <address className="not-italic leading-relaxed  text-sm text-muted-foreground mb-2">
                                <b>Address:</b> {line1},  {city}, {state}, {zip}, {country}
                            </address>
                            <div className="flex flex-col text-sm ">
                                <Link href={`tel:${location.phone.replace(/\s/g, "")}`} prefetch={false} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                                    <b>Phone:</b> {location.phone}
                                </Link>
                                <Link href={`mailto:${location.email}`} prefetch={false} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                                    <b>Email:</b> {location.email}
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h4 className=" font-bold mb-2">Our Hours</h4>
                            <p className=" text-sm text-muted-foreground">
                                We are open Monday through Friday from 9:00 AM to 5:00 PM.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}