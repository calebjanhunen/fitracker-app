import { API_PORT } from '@env';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import getBaseUrl from './utils/GetBaseApiUrl';

interface IErrorResponse {
    message: string | string[];
    error: string;
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
            code: error.response?.data?.statusCode,
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
