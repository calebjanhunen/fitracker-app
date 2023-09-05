import { type User } from '@supabase/supabase-js';

import { type Exercise } from '../../interfaces/Exercise';
import {
    toExerciseSetsApiObject,
    toExercisesApiObject,
    toWorkoutsApiObject,
    validateExercises,
} from './utils/WorkoutsApiAdapter';
import { apiClient } from './utils/config';

export async function saveWorkout(
    payload: { workoutName: string; workoutExercises: Exercise[] },
    user: User | undefined
): Promise<void> {
    const { workoutName, workoutExercises: exercises } = payload;
    const validatedExercises = validateExercises(exercises);
    try {
        // TODO: Need db transaction to rollback if an error occurs (cause inserting in multiple tables)
        // idk how to do that using supabase

        if (!user) {
            throw new Error('Not authenticated.');
        }

        // Insert workout
        const workoutRequestObj = toWorkoutsApiObject(workoutName, user.id);
        const { data: workoutResponse, error: workoutError } = await apiClient
            .from('workouts')
            .insert(workoutRequestObj)
            .select();
        if (workoutError) {
            throw new Error(workoutError.message);
        }

        // Insert exercises
        const exerciseRequestObj = toExercisesApiObject(validatedExercises, workoutResponse[0].id);
        const { data: exercisesResponse, error: exercisesError } = await apiClient
            .from('workout_exercises')
            .insert(exerciseRequestObj)
            .select();
        if (exercisesError) {
            throw new Error(exercisesError.message);
        }

        // Insert sets
        const exerciseSetsRequestObj = toExerciseSetsApiObject(
            validatedExercises,
            exercisesResponse
        );
        console.log(exerciseSetsRequestObj);
        const { error: exerciseSetsError } = await apiClient
            .from('exercise_sets')
            .insert(exerciseSetsRequestObj)
            .select();
        if (exerciseSetsError) {
            throw new Error(exerciseSetsError.message);
        }

        // Build workout object from responses and return it?
        // console.log({
        //     workout: workoutResponse,
        //     exercises: exercisesResponse,
        //     sets: exerciseSetsResponse,
        // });
        // return workoutResponse;
    } catch (error) {
        console.log('basic error: ', error);
        throw new Error(error.message);
    }
}
