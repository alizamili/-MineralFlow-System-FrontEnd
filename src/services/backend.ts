import axios from 'axios';
import { TruckOnTime } from "../model/TruckOnTime.ts";



function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; 
}
const landSideBackendUrl: string = import.meta.env.VITE_BACKEND_URL

export async function fetchTruckOnTime(onTime: Date) {
    const formattedDate = formatDate(onTime);
    const { data: truckOnTimeData } = await axios.get<TruckOnTime[]>(`${landSideBackendUrl}/warehousemanager/trucks/onTime?date=${formattedDate}`);
    return truckOnTimeData;
}
