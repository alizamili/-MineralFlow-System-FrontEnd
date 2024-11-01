import {  useContext } from 'react';
import { useTrucksOnSite } from '../hooks/useTrucksOnSite.ts';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import SecurityContext from '../context/SecurityContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007FFF',
            dark: '#0066CC',
        },
    },
});

export function Dashboard() {
    const { data: trucksOnSite, isLoading } = useTrucksOnSite(true);
    const { hasRole } = useContext(SecurityContext);

    // Define sections based on role
    const sections = hasRole('manager')
    ? [
          { title: "TruckOnTime", path: "/trucks" },
          { title: "Warehouse Info", path: "/warehouse-info" },
          { title: "Purchase Order", path: "/PurchaseOrder" }, // Update to match the route in App
      ]
    : hasRole('seller')
    ? [{ title: "Make Appointment", path: "/appointment" }]
    : [];


    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    padding: 3,
                    gap: 4,
                }}
            >
                {/* Show Trucks On-Site box only for manager */}
                {hasRole('manager') && (
                    <Box
                        sx={{
                            width: 150,
                            height: 80,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            bgcolor: 'primary.dark',
                            color: 'white',
                            fontSize: 14,
                            fontWeight: 'bold',
                            mb: 4,
                            boxShadow: 3,
                        }}
                    >
                        <LocalShippingIcon sx={{ fontSize: 30, mb: 1 }} />
                        {isLoading ? "Loading..." : `Trucks On-Site: ${trucksOnSite}`}
                    </Box>
                )}

                {/* Show only the sections available to the user’s role */}
                <Box sx={{ display: 'flex', gap: 4 }}>
                    {sections.map((section) => (
                        <Link to={section.path} key={section.title} style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    width: 200,
                                    height: 150,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 1,
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                }}
                            >
                                {section.title}
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
}
