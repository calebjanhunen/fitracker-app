import { useRouter } from 'expo-router';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { apiClient } from 'src/api/client';
import { setupRequestInterceptor, setupResponseInterceptor } from 'src/api/utils/api-interceptors';
import { useRefreshToken } from 'src/hooks/auth/useRefreshToken';

interface Props {
    children: React.ReactNode;
}

interface IAuthContext {
    setAccessToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<IAuthContext>({
    setAccessToken: () => {},
});

export function AuthProvider({ children }: Props) {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { refreshToken } = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = setupRequestInterceptor(accessToken);
        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
        };
    }, [accessToken]);

    useEffect(() => {
        const responseInterceptor = setupResponseInterceptor(setAccessToken, handleRefreshError);
        refreshToken();
        return () => {
            apiClient.interceptors.request.eject(responseInterceptor);
        };
    }, []);

    function handleRefreshError() {
        setAccessToken(null);
        router.replace('/(auth)');
    }

    return <AuthContext.Provider value={{ setAccessToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
