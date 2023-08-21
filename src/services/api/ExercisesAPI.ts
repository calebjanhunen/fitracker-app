import { apiClient } from './utils/config';

export const ExercisesAPI = {
    getExercises: async () => {
        try {
            const { data, error } = await apiClient.from('exercises').select('*');
            if (error) {
                throw new Error(error.message);
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
