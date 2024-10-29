import './CardVariants.scss';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import { useTruckOnTime } from "../hooks/TruckOnTime";
import { TruckOnTime } from "../model/TruckOnTime";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from 'react';

interface TruckOnTimeProps {
    time: Date;
    onClearDate: () => void;
}

export default function TruckComponent({ time, onClearDate }: TruckOnTimeProps) {
    const { isLoading, isError, trucks } = useTruckOnTime(time);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredTrucks = trucks?.filter((truck) => {
        return (
            statusFilter === 'all' ||
            (statusFilter === 'on-time' && truck.onTime) ||
            (statusFilter === 'late' && !truck.onTime)
        );
    });

    if (isLoading) return <LoadingIndicator />;
    if (isError) return <ErrorMessage />;

    return (
        <div className="page-container">
            <Link to="/" style={{ position: 'absolute', top: '40px', left: '10px', textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">Back to Home</Button>
            </Link>
            <Button
                onClick={onClearDate}
                variant="outlined"
                color="secondary"
                sx={{
                    position: 'absolute',
                    top: '40px',
                    left: '920px',
                    padding: '5px 10px',
                }}
            >
                Clear Date
            </Button>
            <Typography level="h1" className="page-title">Truck Status</Typography>

            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel>Status Filter</InputLabel>
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status Filter"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="on-time">On-Time</MenuItem>
                    <MenuItem value="late">Late</MenuItem>
                </Select>
            </FormControl>

            {/* Scrollable container */}
            <div className="scrollable-container">
                <TruckHeader />
                <div className="trucks-list">
                    {filteredTrucks?.map((truck) => (
                        <TruckRow key={truck.licensePlate} truck={truck} />
                    ))}
                </div>
            </div>
        </div>
    );
}

const LoadingIndicator = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <Typography level="h3" className="loading-text">Loading trucks...</Typography>
    </div>
);

const ErrorMessage = () => (
    <div className="error-container">
        <Typography level="h3" className="error-text">Error fetching trucks</Typography>
    </div>
);

const TruckHeader = () => (
    <Box className="box-container header">
        <Card className="ruler-card header-card" variant="outlined">
            <div className="card-content">
                {['Seller ID', 'License Plate', 'Material Type', 'Arrival Time', 'Status'].map((header) => (
                    <Typography key={header} level="body1" className="header-item">{header}</Typography>
                ))}
            </div>
        </Card>
    </Box>
);

const TruckRow = ({ truck }: { truck: TruckOnTime }) => {
    const formatTimeOfArrival = (timeArray: number[]): string => {
        const [year, month, day, hour, minute] = timeArray;
        const date = new Date(year, month - 1, day, hour, minute);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formattedDate = formatTimeOfArrival(truck.TimeOfArrival);
    const backgroundColor = truck.onTime ? '#4caf50' : '#f50057';

    const itemStyle = {
        backgroundColor,
        color: 'white',
        padding: '2px 6px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    };

    return (
        <Box className="box-container">
            <Card className="ruler-card" variant="outlined">
                <div className="card-content">
                    <Typography level="body1" className="body-item">
                        <span style={itemStyle}>{truck.sellerId}</span>
                    </Typography>
                    <Typography level="body1" className="body-item">
                        <span style={itemStyle}>{truck.licensePlate}</span>
                    </Typography>
                    <Typography level="body1" className="body-item">
                        <span style={itemStyle}>{truck.materialType}</span>
                    </Typography>
                    <Typography level="body1" className="body-item arrival-time">
                        <span style={itemStyle}>{formattedDate}</span>
                    </Typography>
                    <Typography
                        level="body1"
                        className="status-item"
                        style={{
                            ...itemStyle,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                        }}
                    >
                        {truck.onTime ? 'ON-TIME' : 'LATE'}
                    </Typography>
                </div>
            </Card>
        </Box>
    );
};
