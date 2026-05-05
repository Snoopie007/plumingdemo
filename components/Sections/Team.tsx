import Image from "next/image";
import { cn } from "@/lib/utils";
import { Team } from "@/types/other";
import { teams } from "@/app/Constants/PageContent";
import { TwoColumnImgText } from "./TwoColumnImgText";
interface TeamCardProps {
    team: Team;
    className?: string;
}

function TeamCard({ team, className }: TeamCardProps) {
    return (
        <article className={cn("flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card ", className)}>
            <div className="relative h-[300px] w-full shrink-0">
                <Image
                    src={team.image}
                    alt=""
                    fill
                    sizes="100%"
                    className="object-cover rounded-t-lg"
                />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg  font-bold font-sans ">{team.name}</h3>
                <p className="text-sm/leading-relaxed ">{team.description}</p>

            </div>
        </article>
    );
}

export function TeamSection({ className }: { className?: string }) {

    const isSingle = teams.length === 1;

    return (
        <section className={cn("relative isolate w-full overflow-hidden py-16", className)}  >
            <div className="mx-auto w-full max-w-6xl ">
                <h2 className="mt-2  font-sans text-4xl  text-center font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
                    Meet our instructors
                </h2>

                <div className="mt-12 grid grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {isSingle ? (
                        <TwoColumnImgText
                            image={teams[0].image}
                            headline={teams[0].name}
                            description={[teams[0].description]}
                        />
                    ) : (
                        teams.map((team) => (
                            <TeamCard key={team.name} team={team} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}