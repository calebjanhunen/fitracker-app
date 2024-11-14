import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { ILoginResponse } from 'src/api/auth-service/interfaces/login-response';
import { LoginRequestDto } from 'src/api/auth-service/interfaces/requests/login-request-dto';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { setUser } from 'src/redux/user/UserSlice';

interface IUseLogin {
    isLoading: boolean;
    error: IErrorResponse | null;
    login: (loginForm: LoginRequestDto) => void;
}

export function useLogin(): IUseLogin {
    const router = useRouter();
    const dispatch = useDispatch();
    const { setAccessToken } = useAuth();

    const {
        mutate: login,
        isPending: isLoading,
        error,
    } = useMutation<ILoginResponse, IErrorResponse, LoginRequestDto>({
        mutationFn: AuthApi.login,
        onSuccess: (response) => {
            dispatch(setUser(response.user));
            router.replace('/(workout-tracker');
            setAccessToken(response.accessToken);
        },
    });

    return { login, isLoading, error };
}
