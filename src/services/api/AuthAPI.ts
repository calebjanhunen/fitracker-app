import { apiClient } from './utils/config';

export const AuthAPI = {
    login: async (email: string, password: string) => {
        return await apiClient.auth.signInWithPassword({
            email,
            password,
        });
    },
    logout: async () => {
        return await apiClient.auth.signOut();
    },
    signup: async (username: string, email: string, password: string) => {
        return await apiClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                },
            },
        });
    },
    getCurrentUser: async () => {
        return await apiClient.auth.getSession();
    },
};
