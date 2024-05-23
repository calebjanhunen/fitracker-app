import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
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
    async (error) => {
        // TODO: Log error
        console.debug(error);
        return await Promise.reject(error);
    }
);

export const AUTH = axios.create({
    baseURL: 'http://10.0.2.2:3000/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});
