import { type Tables } from '../../interfaces/Tables';
import { apiClient } from './utils/config';

export const WorkoutsAPI = {
    saveWorkout: async (workout: Tables<'workouts'>) => {
        try {
            const { error } = await apiClient.from('workouts').insert(workout);
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
