/* eslint-disable @typescript-eslint/consistent-type-assertions */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
    accessToken: string | null;
    setAccessTokenOnLogin: (accessToken: string) => Promise<void>;
    removeAccessToken: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: Props): React.ReactElement {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        void setAccessTokenOnRender();
    }, []);

    async function setAccessTokenOnRender(): Promise<void> {
        try {
            const accessToken = await AsyncStorage.getItem('access-token');
            setAccessToken(accessToken);
        } catch (e) {
            console.error(e);
        }
    }

    async function setAccessTokenOnLogin(accessToken: string): Promise<void> {
        try {
            await AsyncStorage.setItem('access-token', accessToken);
            setAccessToken(accessToken);
        } catch (e) {
            console.error(e);
        }
    }

    async function removeAccessToken(): Promise<void> {
        await AsyncStorage.removeItem('access-token');
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessTokenOnLogin, removeAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}
