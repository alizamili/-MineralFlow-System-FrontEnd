import axios from 'axios';
import { TruckOnTime } from "../model/TruckOnTime.ts";
import { Appointment } from "../model/Appointment";
import { PurchaseOrder } from "../model/PurchaseOrder";
import { Warehouse } from "../model/Warehouse";


function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; 
}
const landSideBackendUrl: string = import.meta.env.VITE_BACKEND_URL

export async function fetchTruckOnTime(onTime: Date) {
    const formattedDate = formatDate(onTime);
    const { data: truckOnTimeData } = await axios.get<TruckOnTime[]>(`${landSideBackendUrl}/warehousemanager/trucks/onTime?date=${formattedDate}`);
    return truckOnTimeData;
}



export async function fetchTrucksOnSite(date: Date): Promise<number> {
    const formattedDate = formatDate(date);
    const { data } = await axios.get<number>(`${landSideBackendUrl}/warehousemanager/trucks/onSite?date=${formattedDate}`);
    return data; //
}





export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
        const response = await axios.post(`${landSideBackendUrl}/appointments`, appointment);
        return response.data;

};
export async function fetchPurchaseOrders(): Promise<PurchaseOrder[]> {
    const { data: purchaseOrders } = await axios.get<PurchaseOrder[]>(`${landSideBackendUrl}/PurchaseOrders`);
    return purchaseOrders;
}
export async function fetchWarehouses(): Promise<Warehouse[]> {
    const { data: warehouses } = await axios.get<Warehouse[]>(`${landSideBackendUrl}/warehouseManager`);
    return warehouses;
}


