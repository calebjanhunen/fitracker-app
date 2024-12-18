/* eslint-disable @typescript-eslint/return-await */
import { InternalAxiosRequestConfig } from 'axios';
import { AuthEndpoints } from '../auth-service/login-endpoints';
import * as AuthApi from '../auth-service/login-service';
import { apiClient } from '../client';

export function setupRequestInterceptor(accessToken: string | null) {
    return apiClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
            if (config && !config._retry && accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        }
    );
}

export function setupResponseInterceptor(
    updateAccessToken: (accessToken: string) => void,
    handleRefreshError: () => void
) {
    return apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== AuthEndpoints.refreshToken() &&
                originalRequest.url !== AuthEndpoints.login()
            ) {
                originalRequest._retry = true;

                try {
                    const response = await AuthApi.refreshToken();
                    updateAccessToken(response.accessToken);
                    originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
                    return apiClient(originalRequest);
                } catch (e) {
                    handleRefreshError();
                }
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            return Promise.reject(error);
        }
    );
}
