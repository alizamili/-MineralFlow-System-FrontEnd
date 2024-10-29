export interface Warehouse {
    warehouseId: string;
    sellerId: string;
    materialType: string;
    amountOfMaterialInWarehouse : number;
    warehouseEvents: WarehouseEvent[];
}

export interface WarehouseEvent {
    materialType: string;
    time: number[];
    eventType: string;
}
