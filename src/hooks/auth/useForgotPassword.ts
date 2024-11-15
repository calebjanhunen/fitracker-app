import { useMutation } from '@tanstack/react-query';
import { VerifyEmailDto } from 'src/api/auth-service/interfaces/requests/verify-email-dto';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';

interface IUseForgotPassword {
    forgotPassword: (forgotPasswordDto: VerifyEmailDto) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useForgotPassword(onSuccessCallback: () => void): IUseForgotPassword {
    const {
        mutate: forgotPassword,
        isPending,
        error,
    } = useMutation<unknown, IErrorResponse, VerifyEmailDto>({
        mutationFn: AuthApi.forgotPassword,
        onSuccess: onSuccessCallback,
    });

    return { forgotPassword, isPending, error };
}
