import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import getBaseUrl from './utils/GetBaseApiUrl';

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export async function request<T>(options: AxiosRequestConfig<T>) {
    function onSuccess(response: AxiosResponse) {
        return response.data;
    }

    async function onError(error: AxiosError<IErrorResponse>) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return await Promise.reject({
            message: error.response?.data?.message,
            statusCode: error.response?.data?.statusCode,
        });
    }

    return await apiClient(options).then(onSuccess).catch(onError);
}

// immediately invoked function that's only called once
export const apiClient = (() => {
    return axios.create({
        baseURL: `${getBaseUrl()}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Id': 'test-device-id',
        },
        withCredentials: true,
        timeout: 5000,
    });
})();

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
