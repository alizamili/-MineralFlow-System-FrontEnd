// hooks/usePurchaseOrders.ts
import { useQuery } from '@tanstack/react-query';
import { fetchPurchaseOrders } from "../services/backend";
import { PurchaseOrder } from "../model/PurchaseOrder";

export function usePurchaseOrders(enablePolling: boolean) {
    const { isLoading, isError, data: purchaseOrders } = useQuery<PurchaseOrder[]>({
        queryKey: ['purchaseOrders'],
        queryFn: fetchPurchaseOrders,
        refetchInterval: enablePolling ? 60000 : false, // Poll every 60 seconds if enabled
    });

    return {
        isLoading,
        isError,
        purchaseOrders,
    };
}
