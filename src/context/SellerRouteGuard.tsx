import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SecurityContext from './SecurityContext';

interface Props {
    children: ReactNode;
}

export function SellerRouteGuard({ children }: Props) {
    const { isAuthenticated, hasRole } = useContext(SecurityContext);

    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }

    if (!hasRole('seller')) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}
