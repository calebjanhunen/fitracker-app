import { apiClient } from './utils/config';

export const GymsAPI = {
    getAll: async () => {
        try {
            const { data, error } = await apiClient.from('gyms').select('*');
            if (error) {
                console.error(error);
                return [{ name: 'No gyms available', id: -1 }];
            }
            if (data) {
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    },
};
