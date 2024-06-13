/* eslint-disable @typescript-eslint/consistent-type-assertions */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
    accessToken: string | null;
    storeAccessToken: (accessToken: string) => Promise<void>;
    removeAccessToken: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: Props): React.ReactElement {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        void getAccessToken();
    }, []);

    async function storeAccessToken(accessToken: string): Promise<void> {
        try {
            await AsyncStorage.setItem('access-token', accessToken);
            setAccessToken(accessToken);
        } catch (e) {
            console.error('Failed to save access token to async storage: ', e);
        }
    }

    async function getAccessToken(): Promise<void> {
        try {
            const token = await AsyncStorage.getItem('access-token');
            setAccessToken(token);
        } catch (e) {
            console.error('Failed to get access token from async storage: ', e);
        }
    }

    async function removeAccessToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem('access-token');
            setAccessToken(null);
        } catch (e) {
            console.error('Failed to remove access token from async storage: ', e);
        }
    }

    return (
        <AuthContext.Provider value={{ accessToken, storeAccessToken, removeAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): IAuthContext => useContext(AuthContext);
