// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SecurityContextProvider from "./context/SecurityContextProvider";
import { useContext } from "react";
import SecurityContext from "./context/SecurityContext";
import { Dashboard } from "./pages/Dashboard";
import TruckOnTimePage from "./components/TruckOnTimePage";
import AppointmentForm from "./components/AppointmentForm";
import { RoleGuard } from "./components/RoleGuard";
import PurchaseOrderComponent from "./components/PurchaseOrderComponent";
import WarehouseFloorPlan from "./components/WarehouseFloorPlan";
import WarehouseDetails from "./components/WarehouseDetails";

const queryClient = new QueryClient();

function Header() {
    const { logout, loggedInUser } = useContext(SecurityContext);

    return (
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
            <span>Hello, {loggedInUser}</span>
            <button onClick={logout} style={{
                padding: '5px 10px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Logout
            </button>
        </div>
    );
}

function App() {
    return (
        <SecurityContextProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="/trucks"
                            element={
                                <RoleGuard requiredRole="manager">
                                    <TruckOnTimePage />
                                </RoleGuard>
                            }
                        />
                        <Route
                            path="/warehouse-info"
                            element={
                                <RoleGuard requiredRole="manager">
                                    <WarehouseFloorPlan />
                                </RoleGuard>
                            }
                        />
                        <Route
                            path="/warehouse/:warehouseId"
                            element={
                                <RoleGuard requiredRole="manager">
                                    <WarehouseDetails />
                                </RoleGuard>
                            }
                        />
                        <Route
                            path="/PurchaseOrder"
                            element={
                                <RoleGuard requiredRole="manager">
                                    <PurchaseOrderComponent />
                                </RoleGuard>
                            }
                        />
                        <Route
                            path="/appointment"
                            element={
                                <RoleGuard requiredRole="seller">
                                    <AppointmentForm />
                                </RoleGuard>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </SecurityContextProvider>
    );
}

export default App;
