import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    loggedInUser: string | undefined
    userRole: string | undefined
    hasRole: (role: string) => boolean
    login: () => void
    logout: () => void
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    userRole: undefined,
    hasRole: () => false,
    login: () => {},
    logout: () => {},
})
