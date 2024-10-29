import React from 'react';
import { useLocation } from 'react-router-dom';
import { Warehouse } from '../model/Warehouse';
import './WarehouseDetails.scss';

const WarehouseDetails: React.FC = () => {
    const location = useLocation();
    const warehouse = location.state?.warehouse as Warehouse;

    if (!warehouse) return <p>No warehouse details available.</p>;

    const formatDate = (timeArray: number[]): string => {
        if (timeArray.length < 3) return 'Invalid Date';
        const [year, month, day, hour = 0, minute = 0] = timeArray;
        const date = new Date(year, month - 1, day, hour, minute);
        return date.toLocaleString();
    };

    return (
        <div className="warehouse-details-container">
            <div className="warehouse-info">
                <h2>Warehouse Details</h2>
                <p><strong>Warehouse ID:</strong> {warehouse.warehouseId}</p>
                <p><strong>Seller ID:</strong> {warehouse.sellerId}</p>
                <p><strong>Material Type:</strong> {warehouse.materialType}</p>
                <p><strong>Amount of Material:</strong> {warehouse.amountOfMaterialInWarehouse}</p>
            </div>

            <div className="warehouse-events">
                <h3>Events</h3>
                {warehouse.warehouseEvents.map((event, index) => (
                    <div key={index} className="event-box">
                        <p><strong>Event Type:</strong> {event.eventType}</p>
                        <p><strong>Material:</strong> {event.materialType}</p>
                        <p><strong>Time:</strong> {formatDate(event.time)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WarehouseDetails;
