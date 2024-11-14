import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { ILoginResponse } from 'src/api/auth-service/interfaces/login-response';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { setUser } from 'src/redux/user/UserSlice';

interface IUseRefreshToken {
    isPending: boolean;
    error: IErrorResponse | null;
    refreshToken: () => void;
}

export function useRefreshToken(): IUseRefreshToken {
    const router = useRouter();
    const dispatch = useDispatch();
    const { setAccessToken } = useAuth();

    const {
        mutate: refreshToken,
        isPending,
        error,
    } = useMutation<ILoginResponse, IErrorResponse>({
        mutationFn: AuthApi.refreshToken,
        onSuccess: (response) => {
            setAccessToken(response.accessToken);
            dispatch(setUser(response.user));
            router.replace('/workout-tracker');
        },
        onError: (e) => {
            router.replace('/(auth)');
        },
    });

    return { refreshToken, isPending, error };
}
