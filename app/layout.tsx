import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
import { Header, Footer } from "@/components/Shared";
import { location } from "./Constants/";
import { TooltipProvider } from "@/components/ui"


const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
	weight: ["400", "500", "700", "900"],
});

const roboto = Roboto({
	variable: "--font-roboto",
	style: ["normal", "italic"],
	weight: ["400", "500", "700", "900"],
	subsets: ["latin"],
});


export const metadata: Metadata = {
	title: "MWebTemp",
	description: "A template for building web applications",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn("h-full", "antialiased", roboto.variable, "font-roboto", inter.variable)}
		>
			<TooltipProvider>
				<body className="min-h-full flex flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer location={location} />
					<Toaster />
				</body>
			</TooltipProvider>
		</html>
	);
}
