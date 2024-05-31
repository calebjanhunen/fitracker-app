import type { ExercisesForWorkout } from 'src/interfaces/exercises-for-workout';
import { type Workout } from 'src/interfaces/workout';
import { API } from '../config/axios';

export const workoutsAPI = {
    getWorkouts: async function (): Promise<Workout[]> {
        const response = await API.get<Workout[]>('/workouts');
        return response.data;
    },
    getExercisesForWorkouts: async function (): Promise<ExercisesForWorkout[]> {
        const response = await API.get<ExercisesForWorkout[]>('/workouts/exercises');
        return response.data;
    },
};
