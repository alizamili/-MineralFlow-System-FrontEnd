import { useQuery } from '@tanstack/react-query';
import { fetchTrucksOnSite } from "../services/backend";

export function useTrucksOnSite( enablePolling: boolean) {
    return useQuery({
        queryKey: ['trucksOnSite'],
        queryFn: () => fetchTrucksOnSite(),
        refetchInterval: enablePolling ? 20000 : false,
    });
}
