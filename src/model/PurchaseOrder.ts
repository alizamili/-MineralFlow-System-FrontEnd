// models/PurchaseOrder.ts
export interface OrderLine {
    materialType: string;
    quantity: number;
    pricePerTon: number;
}

export interface PurchaseOrder {
    orderDate: number[]; // Format: [year, month, day]
    purchaseOrderId: string;
    sellerId: { sellerID: string };
    buyerId: string;
    orderLines: OrderLine[];
    status: "fulfilled" | "outstanding";
    customerName: string;
}
