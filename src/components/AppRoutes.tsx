import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import SecurityContext from '../context/SecurityContext';
import { RouteGuard } from './RouteGuard';
import { SellerRouteGuard } from '../context/SellerRouteGuard';
import { Dashboard } from '../pages/Dashboard';
import TruckOnTimePage from './TruckOnTimePage';
import AppointmentForm from '../components/AppointmentForm';

const WarehouseInfo = () => <div>Warehouse Information</div>;
const Inventory = () => <div>Inventory Management</div>;

export function AppRoutes() {
    const { hasRole } = useContext(SecurityContext);
    
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/trucks" element={<RouteGuard><TruckOnTimePage /></RouteGuard>}/>
            <Route path="/warehouse-info" element={<WarehouseInfo/>}/>
            <Route path="/inventory" element={<Inventory/>}/>
            {hasRole('seller') && (
                <Route 
                    path="/appointment" 
                    element={
                        <SellerRouteGuard>
                            <AppointmentForm />
                        </SellerRouteGuard>
                    }
                />
            )}
        </Routes>
    );
}
