import { useMutation } from '@tanstack/react-query';
import { ConfirmSignupCodeDto } from 'src/api/auth-service/interfaces/requests/confirm-signup-code-dto';
import { confirmEmailVerificationCode } from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';

interface IUseConfirmEmailVerificationCode {
    confirmCode: (confirmCodeDto: ConfirmSignupCodeDto) => void;
    isLoading: boolean;
    error: IErrorResponse | null;
}

export function useConfirmEmailVerificationCode(
    onSuccessCallback: () => void
): IUseConfirmEmailVerificationCode {
    const {
        mutate: confirmCode,
        isPending: isLoading,
        error,
    } = useMutation<unknown, IErrorResponse, ConfirmSignupCodeDto>({
        mutationFn: confirmEmailVerificationCode,
        onSuccess: onSuccessCallback,
    });

    return { confirmCode, isLoading, error };
}
