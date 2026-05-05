
import { useQuery } from "@tanstack/react-query";
import { MappedSession } from "@/types/other";



export function useProgramSessions(startDate: Date) {

    const queryKey = ['ProgramSessions', startDate];
    const { data, isLoading, error, refetch } = useQuery<MappedSession[]>({
        queryKey,
        queryFn: async () => {
            const res = await fetch(`/api/public/schedules?date=${startDate.toISOString().split("T")[0]}`);
            if (!res.ok) throw new Error("Failed to fetch contract");
            const data = await res.json();
            return data.sessions;
        },
        enabled: !!startDate,
        // Set the data to be considered fresh for 24 hours
        staleTime: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    });




    return { sessions: data, isLoading, error, refetch };
}
