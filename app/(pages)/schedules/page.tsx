import { cn } from "@/lib/utils";
import { LocationSessions } from "./components/LocationSessions";

export default function SchedulesPage() {
    return (
        <section className="relative w-full bg-muted/30 pb-24 " >
            <div className="pt-20 w-full max-w-7xl mx-auto space-y-7">
                <div className="">
                    <h1 className={cn(
                        "mb-2 uppercase font-sans text-4xl font-black tracking-tight text-foreground",
                        "md:text-center"
                    )}>
                        Class Schedule
                    </h1>
                </div>

                <LocationSessions />
            </div>

        </section>

    );
}
