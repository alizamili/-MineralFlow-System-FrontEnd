import { randomUUID } from "crypto";

type UUID = string; // Define UUID as a type alias for string

export type Warehouse = {
    warehouseId: UUID;
    materialType: string;
    amountOfMaterial: number;
    sellerID: UUID;
}
