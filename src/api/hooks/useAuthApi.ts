import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { IErrorResponse } from '../client';
import { queryClient } from '../react-query-client';
import { authApiService } from '../services';

export function useLogin(
    onSuccessCallback: (username: string) => void,
    onErrorCallback?: (e: IErrorResponse) => void
) {
    const { setAccessToken } = useAuth();

    const {
        mutate: login,
        isPending,
        error,
    } = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (response) => {
            setAccessToken(response.accessToken);
            onSuccessCallback(response.username);
        },
        onError: (e) => {
            if (onErrorCallback) {
                onErrorCallback(e);
            }
        },
    });

    return { login, isPending, error };
}

export function useLogout() {
    const router = useRouter();
    const { setAccessToken } = useAuth();
    const { clearStorage } = useLocalStorage();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: async () => {
            await authApiService.logout();
        },
        onSettled: async () => {
            setAccessToken(null);
            queryClient.clear();
            await clearStorage();
            router.replace('/(auth)');
        },
    });

    return { logout, isPending };
}
