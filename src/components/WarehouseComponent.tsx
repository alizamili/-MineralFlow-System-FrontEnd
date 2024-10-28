// WarehouseComponent.tsx

import './WarehouseFloorplan.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../services/backend';
import { Warehouse } from "../model/Warehouse";
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useState } from 'react';

export default function WarehouseComponent() {
    const { isLoading, isError, data: warehouses } = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: fetchWarehouses
    });

    const [selectedSeller, setSelectedSeller] = useState<string>('');
    const navigate = useNavigate();

    // Filter warehouses based on selected seller
    const filteredWarehouses = selectedSeller
        ? warehouses?.filter(warehouse => warehouse.sellerId === selectedSeller)
        : warehouses;

    if (isLoading) return <LoadingIndicator />;
    if (isError) return <ErrorMessage />;

    // Get unique sellers for dropdown
    const uniqueSellers = Array.from(new Set(warehouses?.map(warehouse => warehouse.sellerId)));

    const handleWarehouseClick = (sellerId: string) => {
        // Navigate to PurchaseOrderComponent with sellerId as a query parameter
        navigate(`/PurchaseOrder?sellerId=${sellerId}`);
    };

    return (
        <div className="wh-floorplan-wrapper">
            <div className="wh-container">
                <div className="wh-header">
                    <Typography level="h1">Warehouse Floorplan</Typography>
                    <Link to="/">
                        <Button variant="outlined">Back to Home</Button>
                    </Link>
                </div>

                {/* Seller Filter Dropdown */}
                <FormControl fullWidth>
                    <InputLabel>Select Seller</InputLabel>
                    <Select
                        value={selectedSeller}
                        onChange={(e) => setSelectedSeller(e.target.value)}
                        label="Select Seller"
                    >
                        <MenuItem value="">All Sellers</MenuItem>
                        {uniqueSellers.map(seller => (
                            <MenuItem key={seller} value={seller}>{seller.slice(0, 8)}...</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className="wh-floorplan">
                    {filteredWarehouses?.map((warehouse, index) => (
                        <WarehouseBlock 
                            key={warehouse.warehouseId} 
                            warehouse={warehouse} 
                            index={index}
                            isHighlighted={warehouse.sellerId === selectedSeller || !selectedSeller}
                            onClick={() => handleWarehouseClick(warehouse.sellerId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const WarehouseBlock = ({ warehouse, index, isHighlighted, onClick }: { 
    warehouse: Warehouse; 
    index: number; 
    isHighlighted: boolean;
    onClick: () => void;
}) => {
    // Position the warehouse blocks in a grid-like layout
    const getPosition = () => {
        const BLOCK_WIDTH = 100;
        const BLOCK_HEIGHT = 80;
        const MARGIN = 15;
        const COLUMNS = 4;

        const row = Math.floor(index / COLUMNS);
        const col = index % COLUMNS;

        return {
            left: col * (BLOCK_WIDTH + MARGIN),
            top: row * (BLOCK_HEIGHT + MARGIN)
        };
    };

    const getCapacityColor = () => {
        if (warehouse.isWarehouseOverloaded) return '#ff4444'; // Red for overflow
        if (warehouse.isWarehouseFull) return '#ffbb33'; // Yellow for nearly full
        return '#00C851'; // Green for safe levels
    };

    const position = getPosition();

    return (
        <div 
            className="warehouse-block"
            style={{
                left: `${position.left}px`,
                top: `${position.top}px`,
                backgroundColor: getCapacityColor(),
                opacity: isHighlighted ? 1 : 0.4, // Highlight or dim based on selection
                cursor: 'pointer' // Indicate clickable
            }}
            onClick={onClick}
        >
            <div className="warehouse-content">
                <h3>Warehouse {warehouse.warehouseId.slice(0, 8)}...</h3>
                <div className="info-row">
                    <span className="label">Material:</span>
                    <span className="value">{warehouse.materialType}</span>
                </div>
                <div className="info-row">
                    <span className="label">Amount:</span>
                    <span className="value">{warehouse.totalRawMaterial.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

const LoadingIndicator = () => (
    <div className="warehouse-loading">
        <div className="spinner"></div>
        <Typography level="h3">Loading Warehouses...</Typography>
    </div>
);

const ErrorMessage = () => (
    <div className="warehouse-error">
        <Typography level="h3">Error Loading Warehouses</Typography>
    </div>
);
