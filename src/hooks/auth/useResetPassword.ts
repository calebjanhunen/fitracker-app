import { useMutation } from '@tanstack/react-query';
import { ResetPasswordDto } from 'src/api/auth-service/interfaces/requests/reset-password-dto';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';

interface IUseResetPassword {
    resetPassword: (forgotPasswordDto: ResetPasswordDto) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useResetPassword(onSuccessCallback: () => void): IUseResetPassword {
    const {
        mutate: resetPassword,
        isPending,
        error,
    } = useMutation<unknown, IErrorResponse, ResetPasswordDto>({
        mutationFn: AuthApi.resetPassword,
        onSuccess: onSuccessCallback,
    });

    return { resetPassword, isPending, error };
}
