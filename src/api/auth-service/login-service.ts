import * as SecureStore from 'expo-secure-store';
import { request } from '../client';
import { IAuthenticationResponse } from './interfaces/authentication-response';
import { ConfirmSignupCodeDto } from './interfaces/requests/confirm-signup-code-dto';
import { ResetPasswordDto } from './interfaces/requests/reset-password-dto';
import { VerifyEmailDto } from './interfaces/requests/verify-email-dto';
import { AuthEndpoints } from './login-endpoints';

export async function sendSignupCode(sendSignupCodeDto: VerifyEmailDto): Promise<void> {
    await request<VerifyEmailDto, null>({
        method: 'POST',
        url: AuthEndpoints.verifyEmail(),
        data: sendSignupCodeDto,
    });
}

export async function confirmEmailVerificationCode(
    confirmSignupCodeDto: ConfirmSignupCodeDto
): Promise<void> {
    await request<VerifyEmailDto, null>({
        method: 'POST',
        url: AuthEndpoints.confirmEmailVerificationCode(),
        data: confirmSignupCodeDto,
    });
}

export async function forgotPassword(forgotPasswordDto: VerifyEmailDto): Promise<void> {
    await request<VerifyEmailDto, null>({
        method: 'POST',
        url: AuthEndpoints.forgotPassword(),
        data: forgotPasswordDto,
    });
}
export async function resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    await request<ResetPasswordDto, null>({
        method: 'PATCH',
        url: AuthEndpoints.resetPassword(),
        data: resetPasswordDto,
    });
}
