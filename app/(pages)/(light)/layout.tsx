
import {
    Footer,
    Header
} from "@/components/Shared";

export default function LightLayout({ children }: { children: React.ReactNode }) {
    const location = {
        name: "Best Plumming & Heating",
        address: {
            line1: "123 Main St",
            line2: "",
            city: "Round Rock",
            state: "TX",
            zip: "78664",
            country: "USA"
        },
        phone: "512-123-4567",
        email: "info@clearflow.com",
        website: "https://www.bestplumbingandheating.com"
    }
    return (
        <>
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer location={location} />
        </>
    )
}