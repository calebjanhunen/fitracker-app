import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LoginService from 'src/api/auth-service/login-service';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
    accessToken: string | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (
        username: string,
        password: string,
        confirmPassword: string,
        email: string,
        firstname: string,
        lastname: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    errorMsg: string;
}

const AuthContext = createContext<IAuthContext>({
    accessToken: null,
    login: async () => {},
    signup: async () => {},
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
            router.replace('/(auth)/Signup');
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

    async function signup(
        username: string,
        password: string,
        confirmPassword: string,
        email: string,
        firstname: string,
        lastname: string
    ): Promise<void> {
        setErrorMsg('');
        setLoading(true);
        try {
            const response = await LoginService.signup(
                username,
                password,
                confirmPassword,
                email,
                firstname,
                lastname
            );
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
        <AuthContext.Provider value={{ accessToken, login, signup, logout, loading, errorMsg }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
