
import {
    Footer,
    Header
} from "@/components/shared";


const location = {
    name: "ClearFlow Plumbing",
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
    website: "https://www.clearflow.com"
}

export default function LightLayout({ children }: { children: React.ReactNode }) {

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