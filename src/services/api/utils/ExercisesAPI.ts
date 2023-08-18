import { apiClient } from './config';

export const ExercisesAPI = {
    getExercises: async (params: { from: number; to: number }) => {
        try {
            const { data, error } = await apiClient
                .from('exercises')
                .select('id, name, primary_muscle')
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
