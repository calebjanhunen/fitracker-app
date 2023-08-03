import React, { createContext, useState } from 'react';
import { capitalizeFirstLetter } from '../../utils/CapitalizeFirstLetter';
import { loginUser } from './authService';

interface Props {
    children: React.ReactNode;
}

export interface AuthContextData {
    sessionToken: string | null;
    username: string | null;
    errorMessage: string | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props): React.ReactElement {
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function login(username: string, password: string): Promise<void> {
        setErrorMessage(null);
        setIsLoading(true);
        try {
            const response = await loginUser(username, password);

            setUsername(response.get('username'));
            setSessionToken(response.getSessionToken());
            setIsLoading(false);
        } catch (error) {
            let errorString = 'Failed to login.';
            if (error instanceof Error) {
                errorString = error.message;
            }
            setErrorMessage(capitalizeFirstLetter(errorString));
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ sessionToken, username, errorMessage, login, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
