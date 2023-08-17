import { type Tables } from '../../interfaces/Tables';
import { apiClient } from './utils/config';

const TABLE_NAME = 'profiles';

export const UsersAPI = {
    getByField: async (field: keyof Tables<'profiles'>, value: string) => {
        try {
            const { data: user, error } = await apiClient
                .from(TABLE_NAME)
                .select('*')
                .eq(field, value);
            if (error) {
                throw new Error(error.message);
            }
            return user[0];
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
