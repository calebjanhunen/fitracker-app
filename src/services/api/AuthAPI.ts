import { type Tables } from '../../interfaces/Tables';
import { type SignupData } from '../../interfaces/User';
import { apiClient } from './utils/config';

export const AuthAPI = {
    login: async (email: string, password: string) => {
        return await apiClient.auth.signInWithPassword({
            email,
            password,
        });
    },
    logout: async () => {
        return await apiClient.auth.signOut();
    },
    signup: async (signupData: SignupData) => {
        try {
            const { data, error } = await apiClient.auth.signUp({
                email: signupData.email,
                password: signupData.password,
                options: {
                    data: {
                        username: signupData.username,
                        skill_level: signupData.skillLevel,
                        country: signupData.location.country,
                        province: signupData.location.province,
                        city: signupData.location.city,
                        gym: signupData.location.gym,
                    },
                },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    insertIntoFitnessGoals: async (
        fitnessGoals: Array<Tables<'fitness_goals'>['id']>,
        userId: string
    ) => {},
    getCurrentUser: async () => {
        return await apiClient.auth.getSession();
    },
};
