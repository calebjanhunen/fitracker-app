import { type Tables } from '../../interfaces/Tables';
import { apiClient } from './utils/config';

export const WorkoutExercisesAPI = {
    saveWorkout: async (data: Array<Tables<'exercise_sets'>>) => {
        try {
            const { error } = await apiClient.from('exercise_sets').insert(data).select();
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
