import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import getBaseUrl from './utils/GetBaseApiUrl';

export interface IErrorResponse {
    message: string;
    statusCode: number;
}

export async function request<T, R>(options: AxiosRequestConfig<T>) {
    function onSuccess(response: AxiosResponse<R>) {
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
    const deviceIdFromStorage = SecureStore.getItem('device-id');
    const generatedDeviceId = uuidv4();
    if (!deviceIdFromStorage) {
        SecureStore.setItem('device-id', generatedDeviceId);
    }
    return axios.create({
        baseURL: `${getBaseUrl()}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Id': deviceIdFromStorage ?? generatedDeviceId,
        },
        withCredentials: true,
        timeout: 5000,
    });
})();
