import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { IAuthenticationResponse } from 'src/api/auth-service/interfaces/authentication-response';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { setUser } from 'src/redux/user/UserSlice';

interface IUseRefreshToken {
    isPending: boolean;
    error: IErrorResponse | null;
    refreshToken: () => void;
    status: string;
}

export function useRefreshToken(
    onSuccess: (accessToken: string) => void,
    onErrorCallback: () => void
): IUseRefreshToken {
    const dispatch = useDispatch();

    const {
        mutate: refreshToken,
        isPending,
        error,
        status,
    } = useMutation<IAuthenticationResponse, IErrorResponse>({
        mutationFn: AuthApi.refreshToken,
        onSuccess: (response) => {
            dispatch(setUser(response.user));
            onSuccess(response.accessToken);
        },
        onError: (e) => {
            onErrorCallback();
        },
    });

    return { refreshToken, isPending, error, status };
}
