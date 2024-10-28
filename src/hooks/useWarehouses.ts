import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../services/backend';
import { Warehouse } from '../model/Warehouse';

export function useWarehouses() {
    const { isLoading, isError, data: warehouses } = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: fetchWarehouses
    });

    return { isLoading, isError, warehouses };
}
