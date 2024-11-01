
import React, { useState, useContext, useEffect } from 'react';
import SecurityContext from '../context/SecurityContext';
import {
    Box,
    Card,
    FormControl,
    FormLabel,
    Input,
    Select,
    Option,
    Button,
    Typography,
    Alert
} from '@mui/joy';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Appointment, MaterialType } from '../model/Appointment';
import { useAppointment } from '../hooks/useAppointment';

export default function AppointmentForm() {
    const { isAuthenticated, userRole } = useContext(SecurityContext);
    const { createAppointmentMutation } = useAppointment();

    const [formData, setFormData] = useState<Partial<Appointment>>({
        sellerId: '',
        licensePlate: '',
        materialType: MaterialType.IRON,
        time: ''
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (userRole && userRole !== 'seller') {
            setErrorMessage('Only sellers can create appointments');
        }
    }, [userRole]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!isAuthenticated() || userRole !== 'seller') {
            setErrorMessage('Access denied. Only sellers can create appointments.');
            return;
        }

        // Ensure all required fields are filled
        if (!formData.sellerId || !formData.licensePlate || !formData.time) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        createAppointmentMutation.mutate(formData as Appointment, {
            onSuccess: () => {
                setSuccessMessage('Appointment created successfully!');
                resetForm();
            },
            onError: (error: any) => {
                // Check for detailed error message from the backend, either as plain text or JSON
                const backendMessage = error.response?.data?.message // Check if `message` field exists
                    || error.response?.data?.error // Check if `error` field exists
                    || (typeof error.response?.data === 'string' ? error.response.data : null) // Plain text response
                    || error.message // Fallback to generic error message
                    || "An error occurred. Please try again."; // Fallback message

                setErrorMessage(backendMessage);
            }
        });
    };

    const resetForm = () => {
        setFormData({
            sellerId: '',
            licensePlate: '',
            materialType: MaterialType.IRON,
            time: ''
        });
    };

    // Block rendering if user is not a seller
    if (userRole !== 'seller') {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Alert color="danger">
                    Access Denied: Only sellers can create appointments.
                </Alert>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    p: 2
                }}
            >
                <Card
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        width: '100%',
                        p: 3
                    }}
                >
                    <Typography level="h4" component="h1" sx={{ mb: 2 }}>
                        Schedule Truck Appointment
                    </Typography>

                    {errorMessage && (
                        <Alert color="danger" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    {successMessage && (
                        <Alert color="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormControl required sx={{ mb: 2 }}>
                            <FormLabel>Seller ID (UUID)</FormLabel>
                            <Input
                                value={formData.sellerId}
                                onChange={(e) =>
                                    setFormData({...formData, sellerId: e.target.value})
                                }
                                placeholder="Enter Seller ID"
                            />
                        </FormControl>

                        <FormControl required sx={{ mb: 2 }}>
                            <FormLabel>License Plate</FormLabel>
                            <Input
                                value={formData.licensePlate}
                                onChange={(e) =>
                                    setFormData({...formData, licensePlate: e.target.value})
                                }
                                placeholder="Enter License Plate"
                            />
                        </FormControl>

                        <FormControl required sx={{ mb: 2 }}>
                            <FormLabel>Material Type</FormLabel>
                            <Select
                                value={formData.materialType}
                                onChange={(_, value) =>
                                    setFormData({...formData, materialType: value as MaterialType})
                                }
                            >
                                {Object.values(MaterialType).map((type) => (
                                    <Option key={type} value={type}>
                                        {type}
                                    </Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ mb: 2 }}>
                            <FormLabel>Date and Time</FormLabel>
                            <DateTimePicker
                                value={formData.time ? dayjs(formData.time) : null}
                                onChange={(newValue) => {
                                    setFormData({
                                        ...formData,
                                        time: newValue ? newValue.toISOString() : ''
                                    });
                                }}
                                minDate={dayjs()} // Prevent selecting past dates
                            />
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Button
                                type="button"
                                variant="soft"
                                color="neutral"
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                loading={createAppointmentMutation.isLoading}
                            >
                                Schedule Appointment
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Box>
        </LocalizationProvider>
    );
}
