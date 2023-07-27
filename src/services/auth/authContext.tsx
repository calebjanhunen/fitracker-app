import React, { createContext, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

export interface AuthContextData {
    isAuthenticated: boolean;
    authData: AuthData;
    signIn: (username: string, password: string) => void;
}

interface AuthData {
    username: string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props): React.ReactElement {
    const [authData, setAuthData] = useState<AuthData>({ username: '' });

    function signIn(username: string, password: string): void {
        setAuthData({ username });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!authData.username, authData, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
