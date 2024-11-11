import * as SecureStore from 'expo-secure-store';
import { request } from '../client';
import { ILoginResponse } from './interfaces/login-response';
import { LoginRequestDto } from './interfaces/requests/login-request-dto';
import { SignupRequestDto } from './interfaces/requests/signup-request-dto';
import { AuthEndpoints } from './login-endpoints';

const REFRESH_TOKEN_STORAGE_KEY = 'refresh-token';

export async function login(loginForm: LoginRequestDto): Promise<string> {
    const response = await request<LoginRequestDto, ILoginResponse>({
        method: 'POST',
        url: AuthEndpoints.login(),
        data: loginForm,
    });
    SecureStore.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken);
    return response.accessToken;
}

export async function logout(): Promise<void> {
    await request({
        method: 'POST',
        url: AuthEndpoints.logout(),
    });
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
}

export async function signup(
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string
): Promise<string> {
    const response = await request<SignupRequestDto, ILoginResponse>({
        method: 'POST',
        url: AuthEndpoints.signup(),
        data: {
            username,
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
        },
    });
    SecureStore.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken);
    return response.accessToken;
}

export async function refreshToken(): Promise<string> {
    const refreshToken = SecureStore.getItem(REFRESH_TOKEN_STORAGE_KEY);
    if (!refreshToken) {
        throw new Error('No refresh token');
    }

    const response = await request<null, ILoginResponse>({
        method: 'POST',
        url: '/auth/refresh',
        headers: {
            'X-Refresh-Token': refreshToken,
        },
    });
    if (!response) {
        throw new Error('No response');
    }

    SecureStore.setItem(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken);
    return response.accessToken;
}
