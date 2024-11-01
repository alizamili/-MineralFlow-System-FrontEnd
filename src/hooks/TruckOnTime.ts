

import { useQuery } from '@tanstack/react-query';
import { fetchTruckOnTime } from "../services/backend.ts";

export function useTruckOnTime(time: Date) {
    const { isLoading, isError, data: trucks} = useQuery({
        queryKey: ['Truck', time],
        queryFn: () => fetchTruckOnTime(time),
        refetchInterval: 20000

    });

    return {
        isLoading,
        isError,
        trucks
    };
}
