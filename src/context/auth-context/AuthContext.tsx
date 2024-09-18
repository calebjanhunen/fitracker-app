import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as LoginApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { queryClient } from 'src/api/react-query-client';
import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';
import { GET_USER_BY_ID_QUERY_KEY } from 'src/api/user-service/UserApiConfig';
import * as UserApi from 'src/api/user-service/UserApiService';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { clearUser, setUser } from 'src/redux/user/UserSlice';

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
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const { refetch } = useQuery<IUserResponse, IErrorResponse>({
        queryFn: UserApi.getUserById,
        queryKey: [GET_USER_BY_ID_QUERY_KEY],
        enabled: false,
    });

    useEffect(() => {
        getAccessTokenFromStorage()
            .then(async (accessToken) => {
                if (accessToken) {
                    router.replace('/(app)/(workout-tracker)/Home');
                    await setUserState();
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
            const response = await LoginApi.login(username, password);
            await saveToStorage(ACCESS_TOKEN_STORAGE_KEY, response.accessToken);
            await setUserState();
            router.replace('/(app)/(workout-tracker)/Home');
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
            const response = await LoginApi.signup(
                username,
                password,
                confirmPassword,
                email,
                firstname,
                lastname
            );
            await saveToStorage(ACCESS_TOKEN_STORAGE_KEY, response.accessToken);
            await setUserState();
            router.replace('/(app)/(workout-tracker)/Home');
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function logout(): Promise<void> {
        router.replace('/(auth)/Signup');
        await removeFromStorage(ACCESS_TOKEN_STORAGE_KEY);
        await queryClient.invalidateQueries();
        queryClient.clear();
        dispatch(clearUser());
    }

    async function getAccessTokenFromStorage(): Promise<string | null> {
        return await getFromStorage(ACCESS_TOKEN_STORAGE_KEY);
    }

    async function setUserState() {
        const { data } = await refetch();
        if (!data) {
            throw new Error('Could not get user');
        }
        dispatch(setUser(data));
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
