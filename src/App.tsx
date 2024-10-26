import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import SecurityContextProvider from "./context/SecurityContextProvider.tsx"
import {RouteGuard} from "./components/RouteGuard.tsx"
import {useContext} from "react"
import TruckComponent from "./components/TruckComponent.tsx"
import SecurityContext from "./context/SecurityContext.ts"
import {Dashboard} from "./pages/Dashboard.tsx";
import TruckOnTimePage from "./components/TruckOnTimePage";

const queryClient = new QueryClient()

function Header() {
    const {logout, loggedInUser} = useContext(SecurityContext);

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

const MakeAppointment = () => <div>Make an Appointment</div>;
const WarehouseInfo = () => <div>Warehouse Information</div>;
const Inventory = () => <div>Inventory Management</div>;

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/trucks" element={<RouteGuard><TruckOnTimePage /></RouteGuard>}/>
                        <Route path="/appointment" element={<MakeAppointment/>}/>
                        <Route path="/warehouse-info" element={<WarehouseInfo/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                    </Routes>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    );
}

export default App;
