import { apiClient } from './utils/config';

export const UserAPI = {
    getByUsername: async (username: string) => {
        try {
            const { data, error } = await apiClient
                .from('profiles')
                .select('*')
                .eq('username', username);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error(`Error getting user: ${username}`);
        }
    },
};
