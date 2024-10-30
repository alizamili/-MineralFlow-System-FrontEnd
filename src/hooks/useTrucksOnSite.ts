import { useQuery } from '@tanstack/react-query';
import { fetchTrucksOnSite } from "../services/backend";

export function useTrucksOnSite(date: Date, enablePolling: boolean) {
    return useQuery({
        queryKey: ['trucksOnSite', date.toISOString().split('T')[0]],
        queryFn: () => fetchTrucksOnSite(date),
        refetchInterval: enablePolling ? 20000 : false,
    });
}
