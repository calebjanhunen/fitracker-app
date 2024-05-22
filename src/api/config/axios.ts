import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const AUTH = axios.create({
    baseURL: 'http://10.0.2.2:3000/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});
