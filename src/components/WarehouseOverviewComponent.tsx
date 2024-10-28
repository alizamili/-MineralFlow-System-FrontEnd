import './WarehouseOverview.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../services/backend';
import { Warehouse } from "../model/Warehouse";
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

export default function WarehouseOverviewComponent() {
    const { isLoading, isError, data: warehouses } = useQuery<Warehouse[]>({
        queryKey: ['warehouses'],
        queryFn: fetchWarehouses
    });

    if (isLoading) return <LoadingIndicator />;
    if (isError) return <ErrorMessage />;

    return (
        <div className="page-container">
            <Link to="/" style={{ position: 'absolute', top: '10px', left: '890px', textDecoration: 'none' }}>
                <Button variant="outlined" color="primary">
                    Back to Home
                </Button>
            </Link>

            <Typography level="h1" className="page-title">Warehouse Overview</Typography>
            
            <div className="warehouse-floorplan">
                {warehouses?.map((warehouse, index) => (
                    <WarehouseBlock 
                        key={warehouse.warehouseId} 
                        warehouse={warehouse} 
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

const WarehouseBlock = ({ warehouse, index }: { warehouse: Warehouse; index: number }) => {
    const getStatusColor = (warehouse: Warehouse): string => {
        if (warehouse.isWarehouseOverloaded) return '#ff4444';
        if (warehouse.isWarehouseFull) return '#ffbb33';
        return '#00C851';
    };

    const getStatusText = (warehouse: Warehouse): string => {
        if (warehouse.isWarehouseOverloaded) return 'OVERLOADED';
        if (warehouse.isWarehouseFull) return 'FULL';
        return 'AVAILABLE';
    };

    // Calculate position based on index
    const row = Math.floor(index / 3);
    const col = index % 3;

    const style = {
        left: `${col * 33}%`,
        top: `${row * 220}px`,
    };

    return (
        <Tooltip 
            title={`Status: ${getStatusText(warehouse)}`}
            arrow
            placement="top"
        >
            <div 
                className="warehouse-block" 
                style={{
                    ...style,
                    backgroundColor: getStatusColor(warehouse),
                }}
            >
                <div className="warehouse-header">
                    <h3>Warehouse {warehouse.warehouseId.slice(0, 8)}</h3>
                </div>
                <div className="warehouse-content">
                    <p><strong>Seller ID:</strong> {warehouse.sellerId.slice(0, 8)}</p>
                    <p><strong>Material:</strong> {warehouse.materialType}</p>
                    <p><strong>Amount:</strong> {warehouse.totalRawMaterial.toFixed(2)}</p>
                    <div className="status-badge">
                        {getStatusText(warehouse)}
                    </div>
                </div>
            </div>
        </Tooltip>
    );
}

const LoadingIndicator = () => (
    <div className="loading-container">
        <div className="loading-spinner"></div>
        <Typography level="h3">Loading warehouses...</Typography>
    </div>
);

const ErrorMessage = () => (
    <div className="error-container">
        <Typography level="h3">Error fetching warehouses</Typography>
    </div>
);
