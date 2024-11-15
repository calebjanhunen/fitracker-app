import { useMutation } from '@tanstack/react-query';
import { VerifyEmailDto } from 'src/api/auth-service/interfaces/requests/verify-email-dto';
import * as AuthApi from 'src/api/auth-service/login-service';
import { IErrorResponse } from 'src/api/client';
import { useLocalStorage } from '../common/useLocalStorage';

interface IUseForgotPassword {
    forgotPassword: (forgotPasswordDto: VerifyEmailDto) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useForgotPassword(onSuccessCallback: () => void): IUseForgotPassword {
    const { saveToStorage, getFromStorage } = useLocalStorage();

    const {
        mutate: forgotPassword,
        isPending,
        error,
    } = useMutation<unknown, IErrorResponse, VerifyEmailDto>({
        mutationFn: async (forgotPasswordDto: VerifyEmailDto) => {
            const timeSinceLastRequest = await getFromStorage(
                'time-since-last-forgot-password-request'
            );
            const now = new Date();

            if (
                timeSinceLastRequest &&
                !areDatesAtLeastFiveMinutesApart(now, new Date(timeSinceLastRequest))
            ) {
                throw new Error('Please wait 5 minutes before making another request');
            }

            await saveToStorage('time-since-last-forgot-password-request', now.toISOString());
            await AuthApi.forgotPassword(forgotPasswordDto);
        },
        onSuccess: onSuccessCallback,
    });

    return { forgotPassword, isPending, error };
}

function areDatesAtLeastFiveMinutesApart(date1: Date, date2: Date): boolean {
    const differenceInMs = Math.abs(date1.getTime() - date2.getTime());
    const fiveMinutesInMs = 5 * 60 * 1000;

    return differenceInMs >= fiveMinutesInMs;
}
