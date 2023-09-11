import { type User } from '@supabase/supabase-js';

import { type Exercise } from '../../interfaces/Exercise';
import { type Workout } from '../../interfaces/Workout';
import {
    toExerciseSetsApiObject,
    toExercisesApiObject,
    toWorkoutsApiObject,
    validateExercises,
} from './utils/WorkoutsApiAdapter';
import { apiClient } from './utils/config';

export async function saveWorkout(
    user: User | undefined,
    workoutName: string,
    exercises: Exercise[]
): Promise<void> {
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
        throw new Error(error.message);
    }
}

export async function getWorkouts(): Promise<Workout[]> {
    try {
        const { data: workouts, error } = await apiClient
            .from('workouts')
            .select(
                `
                    name,
                    dateCreated: created_at,
                    exercises:workout_exercises(
                        id,
                        name: exercises(name),
                        sets: exercise_sets(
                            id,
                            weight,
                            reps,
                            rpe
                        )
                    )
                    `
            )
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return workouts;
    } catch (error) {
        throw new Error(error.message);
    }
}
