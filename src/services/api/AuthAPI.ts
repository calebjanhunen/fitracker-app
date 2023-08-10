import { apiClient } from './config/apiConfig';

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
    getCurrentUser: async () => {
        return await apiClient.auth.getSession();
    },
};
