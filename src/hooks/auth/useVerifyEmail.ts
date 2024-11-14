import { useMutation } from '@tanstack/react-query';
import { VerifyEmailDto } from 'src/api/auth-service/interfaces/requests/verify-email-dto';
import { sendSignupCode } from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';

interface IUseVerifyEmail {
    sendCode: (sendSignupCodeDto: VerifyEmailDto) => void;
    isLoading: boolean;
    error: IErrorResponse | null;
}

export function useVerifyEmail(onSuccessCallback: () => void): IUseVerifyEmail {
    const {
        mutate: sendCode,
        isPending: isLoading,
        error,
    } = useMutation<unknown, IErrorResponse, VerifyEmailDto>({
        mutationFn: sendSignupCode,
        onSuccess: onSuccessCallback,
    });

    return { sendCode, isLoading, error };
}
