import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { IErrorResponse } from '../client';
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
