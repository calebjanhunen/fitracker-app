import { API_PORT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    return await client(options).then(onSuccess).catch(onError);
}

// immediately invoked function that's only called once
const client = (() => {
    return axios.create({
        baseURL: `${getBaseUrl()}:${API_PORT}`,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        timeout: 5000,
    });
})();

client.interceptors.request.use(
    async function (config: InternalAxiosRequestConfig) {
        const accessToken = await AsyncStorage.getItem('access-token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    async function (error) {
        return await Promise.reject(error);
    }
);
