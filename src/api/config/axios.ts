import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { type AxiosError } from 'axios';
import Constants from 'expo-constants';
import { logger } from 'src/services/logger';
import { getApiUrl } from './get-api-url';

const baseUrl = getApiUrl();
const port: string = Constants.expoConfig?.extra?.apiPort;

export const API = axios.create({
    baseURL: `${baseUrl}:${port}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    withCredentials: true,
});

API.interceptors.request.use(
    async function (config) {
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

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        logger.error(error);
        return await Promise.reject(error);
    }
);

export const AUTH = axios.create({
    baseURL: `${baseUrl}:${port}/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

AUTH.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        logger.error(error);
        return await Promise.reject(error);
    }
);
