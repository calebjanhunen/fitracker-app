import { type Workout } from 'src/interfaces/workout';
import { API } from '../config/axios';

export const workoutsAPI = {
    getWorkouts: async function (): Promise<Workout[]> {
        const response = await API.get<Workout[]>('/workouts');
        return response.data;
    },
};
