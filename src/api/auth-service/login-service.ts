import * as SecureStore from 'expo-secure-store';
import { request } from '../client';
import { ILoginResponse } from './interfaces/login-response';
import { SignupRequestDto } from './interfaces/requests/signup-request-dto';
import { AuthEndpoints } from './login-endpoints';

const REFRESH_TOKEN_STORAGE_KEY = 'refresh-token';

export async function login(username: string, password: string): Promise<string> {
    const response = await request({
        method: 'POST',
        url: AuthEndpoints.login(),
        data: {
            username,
            password,
        },
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
): Promise<ILoginResponse> {
    return await request<SignupRequestDto>({
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
}

export async function refreshToken(): Promise<string> {
    const refreshToken = SecureStore.getItem(REFRESH_TOKEN_STORAGE_KEY);
    if (!refreshToken) {
        throw new Error('No refresh token');
    }

    const response = await request<ILoginResponse>({
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
