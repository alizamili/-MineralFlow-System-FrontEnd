// PurchaseOrderComponent.tsx

import './CardVariants.scss';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { usePurchaseOrders } from "../hooks/usePurchaseOrders";
import { PurchaseOrder } from "../model/PurchaseOrder";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LoadingIndicator = (): JSX.Element => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <Typography level="h3" className="loading-text">Loading purchase orders...</Typography>
    </div>
);

const ErrorMessage = () => (
    <div className="error-container">
        <Typography level="h3" className="error-text">Error fetching purchase orders</Typography>
    </div>
);

export default function PurchaseOrderComponent() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const sellerId = queryParams.get('sellerId'); // Optional sellerId parameter from URL

    const { isLoading, isError, purchaseOrders } = usePurchaseOrders(true); // Enable polling
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Filter purchase orders based on seller and status
    const filteredPurchaseOrders = purchaseOrders?.filter((purchaseOrder: PurchaseOrder) => {
        const matchesSeller = !sellerId || purchaseOrder.sellerId.sellerID === sellerId;
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'fulfilled' && purchaseOrder.status === 'fulfilled') ||
            (statusFilter === 'outstanding' && purchaseOrder.status !== 'fulfilled');

        return matchesSeller && matchesStatus;
    });

    if (isLoading) return <LoadingIndicator />;
    if (isError) return <ErrorMessage />;

    return (
        <div className="page-container">
            <Link to="/" style={{ position: 'absolute', top: '40px', left: '70px', textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                    Back to Home
                </Button>
            </Link>

            <Typography level="h1" className="page-title">
                {sellerId ? `Purchase Orders for Seller ${sellerId.slice(0, 8)}...` : 'All Purchase Orders'}
            </Typography>

            {/* Status Filter Dropdown */}
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel>Status Filter</InputLabel>
                <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status Filter"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="fulfilled">Filled</MenuItem>
                    <MenuItem value="outstanding">Outstanding</MenuItem>
                </Select>
            </FormControl>

            <PurchaseOrderHeader />

            <div className="purchase-orders-list">
                {filteredPurchaseOrders?.map((purchaseOrder: PurchaseOrder) => (
                    <PurchaseOrderRow key={purchaseOrder.purchaseOrderId} purchaseOrder={purchaseOrder} />
                ))}
            </div>
        </div>
    );
}

const PurchaseOrderHeader = () => (
    <Box className="box-container">
        <Card className="ruler-card header-card" variant="outlined">
            <div className="card-content">
                {['Order Date', 'Purchase Order ID', 'Seller ID', 'Buyer ID', 'Status'].map((header) => (
                    <Typography key={header} level="body1" className="header-item">{header}</Typography>
                ))}
            </div>
        </Card>
    </Box>
);

const PurchaseOrderRow = ({ purchaseOrder }: { purchaseOrder: PurchaseOrder }) => {
    const formatOrderDate = (timeArray: number[]): string => {
        const [year, month, day] = timeArray;
        const date = new Date(year, month - 1, day);

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const formattedDate = formatOrderDate(purchaseOrder.orderDate);
    const backgroundColor = purchaseOrder.status === "fulfilled" ? '#4caf50' : '#f50057';

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
                        <span style={itemStyle}>{formattedDate}</span>
                    </Typography>
                    <Typography level="body1" className="body-item">
                        <span style={itemStyle}>{purchaseOrder.purchaseOrderId}</span>
                    </Typography>
                    <Typography level="body1" className="body-item">
                        <span style={itemStyle}>{purchaseOrder.sellerId.sellerID}</span>
                    </Typography>
                    <Typography level="body1" className="body-item">
                        <span style={itemStyle}>{purchaseOrder.buyerId}</span>
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
                        {purchaseOrder.status.toUpperCase()}
                    </Typography>
                </div>
            </Card>
        </Box>
    );
};
