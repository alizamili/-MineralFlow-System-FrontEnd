
export interface Appointment {
    sellerId: string;
    licensePlate: string;
    materialType: MaterialType;
    time: string;
}

export enum MaterialType {
    IRON = "IRON",
    GYPSUM = "GYPSUM",
    CEMENT = "CEMENT",
    PETCOKE = "PETCOKE",
    SLAG = "SLAG",
}

