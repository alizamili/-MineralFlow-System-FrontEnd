import {ReactNode, useContext} from 'react'
import SecurityContext from '../context/SecurityContext.ts'

export interface RouteGuardProps {
    children: ReactNode
}

export function RouteGuard({children}: RouteGuardProps) {
    const {isAuthenticated, login} = useContext(SecurityContext)

    if (isAuthenticated()) {
        return children
    } else {
        return <button onClick={login}>Login</button>
    }
}