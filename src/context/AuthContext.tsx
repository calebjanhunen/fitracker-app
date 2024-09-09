import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LoginService from 'src/api/auth-service/login-service';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
    accessToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    errorMsg: string;
}

const AuthContext = createContext<IAuthContext>({
    accessToken: null,
    login: async () => {},
    logout: async () => {},
    loading: false,
    errorMsg: '',
});

export function AuthProvider({ children }: Props) {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        if (accessToken) {
            router.replace('/(app)/WorkoutTracker');
        } else {
            router.replace('/(auth)/Login');
        }
    }, [accessToken]);

    async function login(username: string, password: string): Promise<void> {
        setErrorMsg('');
        setLoading(true);
        try {
            const response = await LoginService.login(username, password);
            setAccessToken(response.accessToken);
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function logout(): Promise<void> {
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, loading, errorMsg }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
