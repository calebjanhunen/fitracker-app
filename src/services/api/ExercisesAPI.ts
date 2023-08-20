import { apiClient } from './utils/config';

export const ExercisesAPI = {
    getExercises: async (params: { from: number; to: number }) => {
        try {
            const { data, error } = await apiClient
                .from('exercises')
                .select('*')
                .range(params.from, params.to);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
