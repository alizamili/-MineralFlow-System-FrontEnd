import { useMemo } from 'react';
import { useTrucksOnSite } from '../../hooks/useTrucksOnSite';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007FFF',
            dark: '#0066CC',
        },
    },
});

export function Dashboard() {
    // Memoize the current date to avoid continuous updates
    const currentDate = useMemo(() =>  new Date(2024, 9, 19, 11, 0, 0), []);
    const { data: trucksOnSite, isLoading } = useTrucksOnSite(currentDate, true);

    const sections = [
        { title: "TruckOnTime", path: "/trucks" },
        { title: "Make Appointment", path: "/appointment" },
        { title: "Warehouse Info", path: "/warehouse-info" },
        { title: "Inventory", path: "/inventory" },
    ];

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

                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {sections.slice(0, 2).map((section) => (
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

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {sections.slice(2).map((section) => (
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
            </Box>
        </ThemeProvider>
    );
}
