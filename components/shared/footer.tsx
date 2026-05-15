import Link from "next/link";
import type { Location } from "@/types/location";
import Image from "next/image";

interface FooterProps {
    location: Location;
}



const topNav = {

    services: [
        { href: "/plumbing", label: "Plumbing" },
        { href: "/drain-cleaning", label: "Drain Cleaning" },
        { href: "/sewer-repair", label: "Sewer Repair" },
        { href: "/sewer-replacement", label: "Sewer Replacement" },
        { href: "/sewer-cleaning", label: "Sewer Cleaning" },
        { href: "/sewer-inspection", label: "Sewer Inspection" },
    ],
    resources: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/contact", label: "Contact Us" },
    ],
} as const;

export function Footer({ location }: FooterProps) {
    const { line1, line2, city, state, zip, country } = location.address;
    const year = new Date().getFullYear();

    return (
        <footer className="bg-background">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

                    <div className="space-y-4">
                        <Image
                            src="/images/logo-ph.svg"
                            alt={location.name}
                            width={250}
                            height={250}
                            loading="lazy"
                            className="w-auto object-contain object-left"
                        />
                    </div>


                    <div className="space-y-2">
                        <p className=" font-semibold text-foreground">{location.name}</p>
                        <address className="not-italic leading-relaxed text-muted-foreground">

                            <div>
                                <b>Address:</b> {line1},  {city}, {state}, {zip}, {country}
                            </div>
                        </address>
                        <div className="flex flex-col gap-1">
                            <Link href={`tel:${location.phone.replace(/\s/g, "")}`} prefetch={false} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                                <b>Phone:</b> {location.phone}
                            </Link>
                            <Link href={`mailto:${location.email}`} prefetch={false} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                                <b>Email:</b> {location.email}
                            </Link>
                        </div>
                    </div>


                    <nav aria-label="Company" className="space-y-4">
                        <p className=" font-semibold text-foreground">Our Services</p>
                        <ul className="space-y-2">
                            {topNav.services.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} prefetch={false} className="text-muted-foreground transition-colors hover:text-foreground">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Resources" className="space-y-4">
                        <p className=" font-semibold text-foreground">Resources</p>
                        <ul className="space-y-2">
                            {topNav.resources.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} prefetch={false} className="text-muted-foreground transition-colors hover:text-foreground">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="flex flex-col gap-4 border-t border-gray-100 py-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-muted-foreground">
                        &copy; {year} {location.name}. All rights reserved.
                    </p>
                    <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                        <Link href="/privacy" prefetch={false} className="text-muted-foreground transition-colors hover:text-foreground">
                            Powered by My Monstro
                        </Link>

                    </nav>
                </div>
            </div>
        </footer>
    );
}
