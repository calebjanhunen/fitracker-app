import { useMutation } from '@tanstack/react-query';
import { SendSignupCodeDto } from 'src/api/auth-service/interfaces/requests/send-signup-code-dto';
import { sendSignupCode } from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';

interface IUseSendSignupCode {
    sendCode: (sendSignupCodeDto: SendSignupCodeDto) => void;
    isLoading: boolean;
    error: IErrorResponse | null;
}

export function useSendSignupCode(onSuccessCallback: () => void): IUseSendSignupCode {
    const {
        mutate: sendCode,
        isPending: isLoading,
        error,
    } = useMutation<unknown, IErrorResponse, SendSignupCodeDto>({
        mutationFn: sendSignupCode,
        onSuccess: onSuccessCallback,
    });

    return { sendCode, isLoading, error };
}
