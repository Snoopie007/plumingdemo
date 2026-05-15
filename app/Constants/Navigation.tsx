export type NavigationItem = {
    id: string;
    href: string;
    label: string;
    submenu?: NavigationItem[];
}
export const MainNavigation = [

    {
        id: "services",
        href: "#",
        label: "Services",
        submenu: [
            { id: "plumbing", href: "#", label: "Plumbing" },
            { id: "drain-cleaning", href: "#", label: "Drain Cleaning" },
            { id: "sewer-repair", href: "#", label: "Sewer Repair" },
            { id: "sewer-replacement", href: "#", label: "Sewer Replacement" },
            { id: "sewer-cleaning", href: "#", label: "Sewer Cleaning" },
            { id: "sewer-inspection", href: "#", label: "Sewer Inspection" },
        ]
    },
    { id: "about", href: "/about", label: "About" },
    { id: "service-areas", href: "/service-areas", label: "Service Areas" },
    { id: "reviews", href: "/reviews", label: "Reviews" },
] as const;
