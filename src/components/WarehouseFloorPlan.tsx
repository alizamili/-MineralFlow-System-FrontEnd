import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWarehouses } from '../hooks/useWarehouses';
import { Warehouse } from '../model/Warehouse';
import './WarehouseFloorPlan.scss';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const MAX_LIMIT = 500;

const WarehouseFloorPlan: React.FC = () => {
    const { warehouses, isLoading, isError } = useWarehouses();
    const navigate = useNavigate();
    const [selectedSellerId, setSelectedSellerId] = useState<string>('');

    const handleWarehouseClick = (warehouse: Warehouse) => {
        navigate(`/warehouse/${warehouse.warehouseId}`, { state: { warehouse } });
    };

    const handleViewOrdersClick = (sellerId: string) => {
        navigate(`/PurchaseOrder?sellerId=${sellerId}`);
    };

    // Update selected seller ID for filtering
    const filteredWarehouses = warehouses?.filter(
        (warehouse) => !selectedSellerId || warehouse.sellerId === selectedSellerId
    );

    if (isLoading) return <p>Loading warehouses...</p>;
    if (isError) return <p>Error loading warehouses.</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {/* Dropdown for Seller Selection */}
            <FormControl variant="outlined" style={{ width: '300px', marginBottom: '20px' }}>
                <InputLabel>Filter by Seller</InputLabel>
                <Select
                    value={selectedSellerId}
                    onChange={(e) => setSelectedSellerId(e.target.value as string)}
                    label="Filter by Seller"
                >
                    <MenuItem value="">All Sellers</MenuItem>
                    {[...new Set(warehouses?.map((w) => w.sellerId))].map((sellerId) => (
                        <MenuItem key={sellerId} value={sellerId}>
                            {sellerId.slice(0, 8)}...
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="floorplan-container">
                {filteredWarehouses?.map((warehouse) => (
                    <div
                        key={warehouse.warehouseId}
                        className={`warehouse-box ${warehouse.amountOfMaterialInWarehouse > MAX_LIMIT ? 'full' : 'not-full'}`}
                        onClick={() => handleWarehouseClick(warehouse)}
                    >
                        <p><strong>Warehouse ID:</strong> {warehouse.warehouseId.slice(0, 8)}...</p>
                        <p><strong>Seller ID:</strong> {warehouse.sellerId.slice(0, 8)}...</p>
                        <p><strong>Material:</strong> {warehouse.materialType}</p>
                        <p><strong>Amount:</strong> {warehouse.amountOfMaterialInWarehouse}</p>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents navigating to warehouse details on button click
                                handleViewOrdersClick(warehouse.sellerId);
                            }}
                        >
                            View Orders
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WarehouseFloorPlan;













//
//
//
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useWarehouses } from '../hooks/useWarehouses';
// import { Warehouse } from '../model/Warehouse';
// import './WarehouseFloorPlan.scss';
// import { Button } from '@mui/material';
//
// const MAX_LIMIT = 500;
//
// const WarehouseFloorPlan: React.FC = () => {
//     const { warehouses, isLoading, isError } = useWarehouses();
//     const navigate = useNavigate();
//
//     const handleWarehouseClick = (warehouse: Warehouse) => {
//         navigate(`/warehouse/${warehouse.warehouseId}`, { state: { warehouse } });
//     };
//
//     const handleViewOrdersClick = (sellerId: string) => {
//         navigate(`/PurchaseOrder?sellerId=${sellerId}`);
//     };
//
//     if (isLoading) return <p>Loading warehouses...</p>;
//     if (isError) return <p>Error loading warehouses.</p>;
//
//     return (
//         <div className="floorplan-container">
//             {warehouses?.map((warehouse) => (
//                 <div
//                     key={warehouse.warehouseId}
//                     className={`warehouse-box ${warehouse.amountOfMaterialInWarehouse > MAX_LIMIT ? 'full' : 'not-full'}`}
//                     onClick={() => handleWarehouseClick(warehouse)}
//                 >
//                     <p><strong>Warehouse ID:</strong> {warehouse.warehouseId.slice(0, 8)}...</p>
//                     <p><strong>Seller ID:</strong> {warehouse.sellerId.slice(0, 8)}...</p>
//                     <p><strong>Material:</strong> {warehouse.materialType}</p>
//                     <p><strong>Amount:</strong> {warehouse.amountOfMaterialInWarehouse}</p>
//                     <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={(e) => {
//                             e.stopPropagation(); // Prevents navigating to warehouse details on button click
//                             handleViewOrdersClick(warehouse.sellerId);
//                         }}
//                     >
//                         View Orders
//                     </Button>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default WarehouseFloorPlan;
//
