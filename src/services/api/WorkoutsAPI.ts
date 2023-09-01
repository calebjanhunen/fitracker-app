import { apiClient } from './utils/config';

import { type User } from '@supabase/supabase-js';
import { type Exercise } from '../../interfaces/Exercise';
import { type Tables } from '../../interfaces/Tables';
import {
    type ExerciseInsertType,
    type ExerciseSetsInsertType,
    type WorkoutInsertType,
} from '../../interfaces/Workout';

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
        const workoutRequestObj = prepareWorkoutRequestObject(workoutName, user.id);
        const { data: workoutResponse, error: workoutError } = await apiClient
            .from('workouts')
            .insert(workoutRequestObj)
            .select();
        if (workoutError) {
            throw new Error(workoutError.message);
        }

        // Insert exercises
        const exerciseRequestObj = prepareExercisesRequestObject(
            validatedExercises,
            workoutResponse[0].id
        );
        const { data: exercisesResponse, error: exercisesError } = await apiClient
            .from('workout_exercises')
            .insert(exerciseRequestObj)
            .select();
        if (exercisesError) {
            throw new Error(exercisesError.message);
        }

        // Insert sets
        const exerciseSetsRequestObj = prepareExerciseSetsRequestObject(
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

function prepareWorkoutRequestObject(workoutName: string, userId: string): WorkoutInsertType {
    return {
        name: workoutName,
        user_id: userId,
    };
}

function prepareExercisesRequestObject(
    exercises: Exercise[],
    workoutId: number
): ExerciseInsertType[] {
    const validExercises = exercises.filter((exercise) => exercise.valid);
    return validExercises.map((exercise) => {
        console.log('exercise: ', exercise);
        return {
            exercises_id: exercise.id,
            workout_id: workoutId,
        };
    });
}

function prepareExerciseSetsRequestObject(
    exercises: Exercise[],
    exercisesResponse: Array<Tables<'workout_exercises'>>
): ExerciseSetsInsertType[] {
    let exerciseSetsRequestObj: ExerciseSetsInsertType[] = [];
    exercises.forEach((exercise) => {
        const validSets = exercise.sets.filter((set) => set.valid);
        validSets.forEach((set, index) => {
            // Get id from exercise in database
            const exerciseResponse = exercisesResponse.filter(
                (e) => e.exercises_id === exercise.id
            )[0];

            if (set.weight && set.reps) {
                exerciseSetsRequestObj = [
                    ...exerciseSetsRequestObj,
                    {
                        workout_exercises_id: exerciseResponse.id,
                        set_num: index + 1,
                        weight: set.weight,
                        reps: set.reps,
                        rpe: set.rpe,
                    },
                ];
            }
        });
    });
    return exerciseSetsRequestObj;
}

// Loops through exercise sets and if all sets are invalid (both reps and sets are empty) or if exercise has no sets -> sets exercise to invalid
function validateExercises(workoutExercises: Exercise[]): Exercise[] {
    const validatedExercises = workoutExercises.map((exercise) => {
        let allSetsInvalid = true;
        // Loop through all sets of exercise
        exercise.sets.forEach((set) => {
            if (set.valid) {
                allSetsInvalid = false;
            }
        });

        // If every set is invalid -> set exercise to invalid
        if (allSetsInvalid || exercise.sets.length === 0) {
            return { ...exercise, valid: false };
        } else {
            return exercise;
        }
    });

    // return false if any set in the workout is invalid
    return validatedExercises;
}
