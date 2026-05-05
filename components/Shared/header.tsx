"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { PrimaryCTAButton } from "@/components/ui";
import { MainNavigation } from "@/app/Constants/";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Header() {
    const isMobile = useIsMobile();


    return (
        <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
            <div className="mx-auto flex w-full items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
                <div className="">
                    <Image
                        src="/images/logo-ph.png"
                        alt="Logo"
                        width={120}
                        height={80}
                        priority

                        className="h-[50px] w-auto max-h-[50px] object-contain object-left"
                    />
                </div>
                <div className="flex items-center gap-4">

                    {isMobile ? (
                        <MobileMenu />
                    ) : (
                        <div className="flex items-center gap-4">
                            <NavigationMenu
                                viewport={false}
                                className="ml-auto max-w-none flex-none justify-end"
                                aria-label="Main"
                            >
                                <NavigationMenuList className="justify-end gap-1">
                                    {MainNavigation.map((item) => {
                                        if ("submenu" in item && item.submenu) {
                                            return (
                                                <NavigationMenuItem key={item.id}>
                                                    <NavigationMenuTrigger
                                                        className={cn(
                                                            "font-bold text-base text-white",
                                                            " hover:bg-foreground/10 focus:bg-foreground/10 ",
                                                            "data-popup-open:bg-foreground/10 data-popup-open:hover:bg-foreground/10",
                                                            " data-open:bg-primary/50",
                                                            " data-open:hover:bg-foreground/10 data-open:focus:bg-foreground/10",
                                                        )}
                                                    >
                                                        {item.label}
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent className="rounded-md">
                                                        <ul className="m-0 w-43 list-none p-0">
                                                            {item.submenu.map((sub) => (
                                                                <li key={sub.id}>
                                                                    <NavigationMenuLink
                                                                        asChild
                                                                        className=" text-base font-medium  hover:bg-foreground/10 focus:bg-foreground/10"
                                                                    >
                                                                        <Link href={sub.href} prefetch={false}>
                                                                            {sub.label}
                                                                        </Link>
                                                                    </NavigationMenuLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                            );
                                        }
                                        return (
                                            <NavigationMenuItem key={item.id}>
                                                <NavigationMenuLink
                                                    asChild
                                                    className="font-bold text-base text-white hover:bg-foreground/10 focus:bg-foreground/10"
                                                >
                                                    <Link href={item.href} prefetch={false}>
                                                        {item.label}
                                                    </Link>
                                                </NavigationMenuLink>
                                            </NavigationMenuItem>
                                        );
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                            <PrimaryCTAButton size="sm" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

function mobileNavLinks() {
    const links: { key: string; href: string; label: string }[] = [];
    for (const item of MainNavigation) {
        if ("submenu" in item && item.submenu) {
            for (const sub of item.submenu) {
                links.push({ key: sub.id, href: sub.href, label: sub.label });
            }
        } else {
            links.push({ key: item.id, href: item.href, label: item.label });
        }
    }
    return links;
}

function MobileMenu() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);



    return (
        <>
            <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
            >
                <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-6" aria-hidden />
            </button>
            {open ? (
                <div
                    id="mobile-navigation"
                    className="fixed inset-0 z-100 flex flex-col bg-background/98 backdrop-blur-md"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Site navigation"
                >
                    <div className="flex items-center justify-end px-4 py-4 sm:px-6">
                        <button
                            type="button"
                            className="inline-flex size-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                        >
                            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-6" aria-hidden />
                        </button>
                    </div>
                    <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-24">
                        {mobileNavLinks().map(({ key, href, label }) => (
                            <Link
                                key={key}
                                href={href}
                                prefetch={false}
                                className="text-xl font-medium text-foreground transition-colors hover:text-foreground/70"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            ) : null}
        </>
    )
}