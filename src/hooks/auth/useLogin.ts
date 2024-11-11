import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LoginRequestDto } from 'src/api/auth-service/interfaces/requests/login-request-dto';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { useAuth } from 'src/context/auth-context/AuthContext';

interface IUseLogin {
    isLoading: boolean;
    error: IErrorResponse | null;
    login: (loginForm: LoginRequestDto) => void;
}

export function useLogin(): IUseLogin {
    const router = useRouter();
    const { setAccessToken } = useAuth();

    const {
        mutate: login,
        isPending: isLoading,
        error,
    } = useMutation<string, IErrorResponse, LoginRequestDto>({
        mutationFn: AuthApi.login,
        onSuccess: (accessToken) => {
            setAccessToken(accessToken);
            router.replace('/(app)/workout-tracker');
        },
    });

    return { login, isLoading, error };
}
