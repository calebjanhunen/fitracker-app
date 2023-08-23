import { type Tables } from '../../interfaces/Tables';
import { apiClient } from './utils/config';

export const WorkoutExercisesAPI = {
    saveWorkout: async (data: Array<Tables<'workout_exercises'>>) => {
        try {
            const { error } = await apiClient.from('workout_exercises').insert(data).select();
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
