import { AUTH } from '../config/axios';
import { type LoginResponse } from './auth-response';

export const authAPI = {
    login: async function (username: string, password: string): Promise<LoginResponse> {
        const response = await AUTH.post<LoginResponse>('/login', {
            username,
            password,
        });

        return response.data;
    },
};
