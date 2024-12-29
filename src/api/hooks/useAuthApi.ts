import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { clearSignupForm } from 'src/redux/signup-form/SignupFormSlice';
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
    const router = useRouter();

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
            router.replace('/workout-tracker');
        },
        onError: (e) => {
            onErrorCallback();
        },
    });

    return { refreshToken, isPending, error, status };
}

export function useSignup(onSuccessCallback: (accessToken: string) => void) {
    const dispatch = useDispatch();

    const {
        mutate: signup,
        isPending: isLoading,
        error,
    } = useMutation({
        mutationFn: authApiService.signup,
        onSuccess: (response) => {
            dispatch(updateUsername(response.username));
            onSuccessCallback(response.accessToken);
            dispatch(clearSignupForm());
        },
    });

    return { signup, isLoading, error };
}
