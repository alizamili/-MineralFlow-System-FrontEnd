import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import SecurityContextProvider from "./context/SecurityContextProvider.tsx"
import {RouteGuard} from "./components/RouteGuard.tsx"
import {useContext} from "react"
import TruckComponent from "./components/TruckComponent.tsx"
import SecurityContext from "./context/SecurityContext.ts"

const queryClient = new QueryClient()

function Header() {
    const {logout, loggedInUser} = useContext(SecurityContext)
    return (
        <div>
            <div>Hello {loggedInUser}</div>
            <nav>
                <Link to="/">Home</Link> | <Link to="/trucks">Trucks</Link>
            </nav>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

function HomePage() {
    return (
        <div>
            <h1>Welcome to the Truck Management System</h1>
            <p>This is the home page. Click on the links to navigate.</p>
        </div>
    )
}

function App() {
    const currentTime = new Date(2024, 9, 19, 11, 0, 0)

    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/trucks" element={<RouteGuard> <TruckComponent time={currentTime} /></RouteGuard>} />


                    </Routes>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
