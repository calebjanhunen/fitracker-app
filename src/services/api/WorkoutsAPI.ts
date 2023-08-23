import { type Tables } from '../../interfaces/Tables';
import { type InsertWorkoutRequest } from '../../interfaces/Workout';
import { apiClient } from './utils/config';

export async function saveWorkout(
    workout: InsertWorkoutRequest
): Promise<Array<Tables<'workouts'>>> {
    try {
        // Insert workout
        const { data: workoutResponse, error: workoutError } = await apiClient
            .from('workouts')
            .insert(workout.workout)
            .select();
        if (workoutError) {
            throw new Error(workoutError.message);
        }

        // Insert exercises
        const { data: exerciseResponse, error: exercisesError } = await apiClient
            .from('exericses')
            .insert(workout.exercises)
            .select();
        if (exercisesError) {
            throw new Error(exercisesError.message);
        }

        // Insert sets
        const { data: exerciseSetsResponse, error: exerciseSetsError } = await apiClient
            .from('exercise_sets')
            .insert(workout.sets)
            .select();
        if (exerciseSetsError) {
            throw new Error(exerciseSetsError.message);
        }

        // Build workout object from responses and return it?
        console.log({
            workout: workoutResponse,
            exercises: exerciseResponse,
            sets: exerciseSetsResponse,
        });

        return workoutResponse;
    } catch (error) {
        throw new Error(error.message);
    }
}
