// src/components/RoleGuard.tsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SecurityContext from '../context/SecurityContext';

interface RoleGuardProps {
    requiredRole: string;
    children: JSX.Element;
}

export function RoleGuard({ requiredRole, children }: RoleGuardProps) {
    const { hasRole } = useContext(SecurityContext);

    // If the user does not have the required role, redirect to the home page
    if (!hasRole(requiredRole)) {
        return <Navigate to="/" />;
    }

    return children;
}
