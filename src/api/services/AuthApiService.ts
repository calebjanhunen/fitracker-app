import * as SecureStore from 'expo-secure-store';
import { apiClient } from '../client';
import {
    AuthApi,
    AuthenticationResponseDto,
    ConfirmEmailVerificationCodeDto,
    ResetPasswordDto,
    UserLoginDto,
    UserSignupDto,
    VerifyEmailDto,
} from '../generated';

const authApi = new AuthApi(undefined, undefined, apiClient);
const REFRESH_TOKEN_STORAGE_KEY = 'refresh-token';

export const authApiService = {
    async login(request: UserLoginDto): Promise<AuthenticationResponseDto> {
        const response = await authApi.login(request);
        SecureStore.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refreshToken);
        return response.data;
    },
    async logout(): Promise<void> {
        await authApi.logout();
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
    },
    async signup(request: UserSignupDto): Promise<AuthenticationResponseDto> {
        const response = await authApi.signup(request);
        SecureStore.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refreshToken);
        return response.data;
    },
    async refreshToken(): Promise<AuthenticationResponseDto> {
        try {
            const refreshToken = SecureStore.getItem(REFRESH_TOKEN_STORAGE_KEY);
            if (!refreshToken) {
                throw new Error('No refresh token');
            }

            const response = await authApi.refreshToken({
                headers: {
                    'X-Refresh-Token': refreshToken,
                },
            });

            SecureStore.setItem(REFRESH_TOKEN_STORAGE_KEY, response.data.refreshToken);
            return response.data;
        } catch (e) {
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
            throw e;
        }
    },
    async sendSignupCode(request: VerifyEmailDto): Promise<void> {
        await authApi.verifyEmailOnSignup(request);
    },
    async confirmEmailVerificationCode(request: ConfirmEmailVerificationCodeDto): Promise<void> {
        await authApi.confirmEmailVerificationCode(request);
    },
    async forgotPassword(request: VerifyEmailDto): Promise<void> {
        await authApi.forgotPassword(request);
    },
    async resetPassowrd(request: ResetPasswordDto): Promise<void> {
        await authApi.resetPassword(request);
    },
};
