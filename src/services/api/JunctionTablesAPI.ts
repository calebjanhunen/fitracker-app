import { apiClient } from './utils/config';

export const JunctionTableAPI = {
    insertIntoUserFitnessGoals: async (values: number[], userId: string) => {
        const associations = values.map((value) => ({
            user_id: userId,
            fitness_goal_id: value,
        }));

        try {
            const { error } = await apiClient.from('user_fitness_goals').insert(associations);
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    insertIntoUserWorkoutTypes: async (values: number[], userId: string) => {
        const associations = values.map((value) => ({
            user_id: userId,
            workout_type_id: value,
        }));

        try {
            const { error } = await apiClient.from('user_workout_types').insert(associations);
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    insertIntoUserWorkoutTimes: async (values: number[], userId: string) => {
        const associations = values.map((value) => ({
            user_id: userId,
            workout_time_id: value,
        }));

        try {
            const { error } = await apiClient.from('user_workout_times').insert(associations);
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    insertIntoUserWorkoutDays: async (values: number[], userId: string) => {
        const associations = values.map((value) => ({
            user_id: userId,
            workout_day_id: value,
        }));

        try {
            const { error } = await apiClient.from('user_workout_days').insert(associations);
            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
