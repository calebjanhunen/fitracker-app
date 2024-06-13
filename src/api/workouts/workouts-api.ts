import type { WorkoutForm } from 'src/interfaces';
import type { ExerciseForWorkout } from 'src/interfaces/exercises-for-workout';
import { type Workout } from 'src/interfaces/workout';
import { sanitizeWorkout } from 'src/utils/workout-form-utils';
import { API } from '../config/axios';

export const workoutsAPI = {
    getWorkouts: async function (): Promise<Workout[]> {
        const response = await API.get<Workout[]>('/workouts');
        return response.data;
    },
    saveWorkout: async function (workout: WorkoutForm): Promise<Workout> {
        const sanitizedWorkout = sanitizeWorkout(workout);
        const response = await API.post<Workout>('/workouts', sanitizedWorkout);
        return response.data;
    },
    deleteWorkout: async function (workoutId: string): Promise<void> {
        await API.delete(`/workouts/${workoutId}`);
    },
    getExercisesForWorkouts: async function (): Promise<ExerciseForWorkout[]> {
        const response = await API.get<ExerciseForWorkout[]>('/workouts/exercises');
        return response.data;
    },
};
