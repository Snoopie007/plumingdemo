export type NavigationItem = {
    id: string;
    href: string;
    label: string;
    submenu?: NavigationItem[];
}
export const MainNavigation = [
    { id: "home", href: "/", label: "Home" },
    { id: "pricing", href: "/pricing", label: "Pricing" },
    {
        id: "programs",
        href: "#",
        label: "Programs",
        submenu: [
            { id: "lil-dragon", href: "/programs/lil-dragon", label: "Lil Dragon" },
            { id: "kiddie-dragon", href: "/programs/kiddie-dragon", label: "Kiddie Dragon" },
            { id: "dragon-tales", href: "/programs/dragon-tales", label: "Dragon Tales" },
        ]
    },
    { id: "quick-tour", href: "/quick-tour", label: "Quick Tour" },

] as const;
