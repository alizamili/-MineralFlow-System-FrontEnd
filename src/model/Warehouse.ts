// import { randomUUID } from "crypto";
//
// type UUID = string; // Define UUID as a type alias for string
//
// export type Warehouse = {
//     warehouseId: UUID;
//     materialType: string;
//     amountOfMaterial: number;
//     sellerID: UUID;
// }

export interface Warehouse {
    warehouseId: string;
    sellerId: string;
    totalRawMaterial: number;
    materialType: string;
    isWarehouseFull: boolean;
    isWarehouseOverloaded: boolean;
}
