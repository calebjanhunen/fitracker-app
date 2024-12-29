import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { updateUsername } from 'src/redux/user/UserSlice';
import { IErrorResponse } from '../client';
import { queryClient } from '../react-query-client';
import { authApiService } from '../services';

export function useLogin(
    onSuccessCallback: (username: string) => void,
    onErrorCallback?: (e: IErrorResponse) => void
) {
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        mutate: login,
        isPending,
        error,
    } = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (response) => {
            dispatch(updateUsername(response.username));
            router.replace('/workout-tracker');
            onSuccessCallback(response.accessToken);
        },
        onError: (e) => {
            if (onErrorCallback) {
                onErrorCallback(e);
            }
        },
    });

    return { login, isPending, error };
}

export function useLogout(onSettledCallback: () => void) {
    const router = useRouter();
    const { clearStorage } = useLocalStorage();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: async () => {
            await authApiService.logout();
        },
        onSettled: async () => {
            onSettledCallback();
            queryClient.clear();
            await clearStorage();
            router.replace('/(auth)');
        },
    });

    return { logout, isPending };
}

export function useRefreshToken(
    onSuccess: (accessToken: string) => void,
    onErrorCallback: () => void
) {
    const dispatch = useDispatch();

    const {
        mutate: refreshToken,
        isPending,
        error,
        status,
    } = useMutation({
        mutationFn: authApiService.refreshToken,
        onSuccess: (response) => {
            dispatch(updateUsername(response.username));
            onSuccess(response.accessToken);
        },
        onError: (e) => {
            onErrorCallback();
        },
    });

    return { refreshToken, isPending, error, status };
}
