/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as AuthApi from 'src/api/auth-service/login-service';
import { apiClient, IErrorResponse } from 'src/api/client';
import { queryClient } from 'src/api/react-query-client';
import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';
import { GET_USER_BY_ID_QUERY_KEY } from 'src/api/user-service/UserApiConfig';
import * as UserApi from 'src/api/user-service/UserApiService';
import { setupRequestInterceptor, setupResponseInterceptor } from 'src/api/utils/api-interceptors';
import { clearUser, setUser } from 'src/redux/user/UserSlice';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
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
    setAccessToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<IAuthContext>({
    signup: async () => {},
    logout: async () => {},
    loading: false,
    errorMsg: '',
    setAccessToken: () => {},
});

export function AuthProvider({ children }: Props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { refetch: getUserData } = useQuery<IUserResponse, IErrorResponse>({
        queryFn: UserApi.getUserById,
        queryKey: [GET_USER_BY_ID_QUERY_KEY],
        enabled: false,
    });

    useEffect(() => {
        const requestInterceptor = setupRequestInterceptor(accessToken);

        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
        };
    }, [accessToken]);

    useEffect(() => {
        const responseInterceptor = setupResponseInterceptor(setAccessToken, handleRefreshError);

        async function refreshToken() {
            try {
                const accessToken = await AuthApi.refreshToken();
                await setUserState();
                setAccessToken(accessToken);
                router.replace('/workout-tracker');
            } catch (e) {
                router.replace('/(auth)');
            }
        }

        // Get new access token on initial render
        refreshToken();
        return () => {
            apiClient.interceptors.request.eject(responseInterceptor);
        };
    }, []);

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
            const accessToken = await AuthApi.signup(
                username,
                password,
                confirmPassword,
                email,
                firstname,
                lastname
            );
            await setUserState();
            setAccessToken(accessToken);
            router.replace('/workout-tracker');
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function logout(): Promise<void> {
        router.replace('/(auth)');
        await queryClient.invalidateQueries();
        queryClient.clear();
        dispatch(clearUser());
        await AuthApi.logout();
    }

    async function setUserState() {
        const { data } = await getUserData();
        if (!data) {
            Alert.alert('Could not get user data');
            return;
        }
        dispatch(setUser(data));
    }

    function handleRefreshError() {
        setAccessToken(null);
        router.replace('/(auth)');
    }

    return (
        <AuthContext.Provider value={{ signup, logout, loading, errorMsg, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
