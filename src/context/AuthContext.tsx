import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as LoginService from 'src/api/auth-service/login-service';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

const ACCESS_TOKEN_STORAGE_KEY = 'access-token';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
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
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
    loading: false,
    errorMsg: '',
});

export function AuthProvider({ children }: Props) {
    const { getFromStorage, saveToStorage, removeFromStorage } = useLocalStorage();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        getAccessTokenFromStorage()
            .then((accessToken) => {
                if (accessToken) {
                    router.replace('/(app)/(workout-tracker)');
                } else {
                    router.replace('/(auth)/Signup');
                }
            })
            .catch((e) => {
                console.error('Error getting access token: ', e);
            });
    }, []);

    async function login(username: string, password: string): Promise<void> {
        setErrorMsg('');
        setLoading(true);
        try {
            const response = await LoginService.login(username, password);
            await saveToStorage(ACCESS_TOKEN_STORAGE_KEY, response.accessToken);
            router.replace('/(app)/(workout-tracker)');
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
            await saveToStorage(ACCESS_TOKEN_STORAGE_KEY, response.accessToken);
            router.replace('/(app)/(workout-tracker)');
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function logout(): Promise<void> {
        await removeFromStorage(ACCESS_TOKEN_STORAGE_KEY);
        router.replace('/(auth)/Signup');
    }

    async function getAccessTokenFromStorage(): Promise<string | null> {
        return await getFromStorage(ACCESS_TOKEN_STORAGE_KEY);
    }

    return (
        <AuthContext.Provider value={{ login, signup, logout, loading, errorMsg }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
