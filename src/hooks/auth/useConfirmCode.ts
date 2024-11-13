import { useMutation } from '@tanstack/react-query';
import { ConfirmSignupCodeDto } from 'src/api/auth-service/interfaces/requests/confirm-signup-code-dto';
import { confirmSignupCode } from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';

interface IUseConfirmCode {
    confirmCode: (confirmCodeDto: ConfirmSignupCodeDto) => void;
    isLoading: boolean;
    error: IErrorResponse | null;
}

export function useConfirmCode(onSuccessCallback: () => void): IUseConfirmCode {
    const {
        mutate: confirmCode,
        isPending: isLoading,
        error,
    } = useMutation<unknown, IErrorResponse, ConfirmSignupCodeDto>({
        mutationFn: confirmSignupCode,
        onSuccess: onSuccessCallback,
    });

    return { confirmCode, isLoading, error };
}
