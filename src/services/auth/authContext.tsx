import React, { createContext, useState } from 'react';
import { loginUser } from './authService';

interface Props {
    children: React.ReactNode;
}

export interface AuthContextData {
    isAuthenticated: boolean;
    authData: AuthData;
    error: string;
    login: (username: string, password: string) => Promise<boolean>;
}

interface AuthData {
    username: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props): React.ReactElement {
    const [authData, setAuthData] = useState<AuthData>({ username: '' });
    const [error, setError] = useState<string>('');

    async function login(username: string, password: string): Promise<boolean> {
        try {
            const response = await loginUser(username, password);
            setAuthData({ username: response.get('username') });
            return true;
        } catch (error) {
            let errorMessage = 'Failed to login.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setError(errorMessage);
            return false;
        }
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: !!authData.username, authData, error, login }}
        >
            {children}
        </AuthContext.Provider>
    );
}
