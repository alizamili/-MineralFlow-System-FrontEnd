import { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import TruckComponent from './TruckComponent';

export function TruckOnTimePage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [inputDate, setInputDate] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputDate(e.target.value);
        setError("");
    };

    const handleSubmit = () => {
        if (!inputDate) {
            setError("Please select a date.");
            return;
        }
        const date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            setSelectedDate(date);
        } else {
            setError("Invalid date. Please enter a valid date.");
        }
    };

    const handleClearDate = () => {
        setSelectedDate(null);
        setInputDate("");
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                gap: 2,
                position: 'relative',
            }}
        >
            {!selectedDate ? (
                <>
                    <Link to="/" style={{ position: 'absolute', top: '50px', left: '150px', textDecoration: 'none' }}>
                        <Button variant="outlined" color="primary">
                            Back to Home
                        </Button>
                    </Link>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4">Enter a Date to View Trucks</Typography>
                        <TextField
                            type="date"
                            value={inputDate}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </>
            ) : (
                <TruckComponent time={selectedDate} onClearDate={handleClearDate} />
            )}
        </Box>
    );
}

export default TruckOnTimePage;
