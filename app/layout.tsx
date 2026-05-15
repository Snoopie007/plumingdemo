import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui"
import { QuizPopup } from "@/components/popups"

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
	title: "Monstro X Website",
	description: "A website for Monstro X",
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

					{children}
					<Toaster />
					<QuizPopup />

				</body>
			</TooltipProvider>
		</html >
	);
}
