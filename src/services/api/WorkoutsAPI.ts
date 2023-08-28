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
    try {
        // TODO: Need db transaction to rollback if an error occurs (cause inserting in multiple tables)
        // idk how to do that using supabase

        if (!user) {
            throw new Error('Not authenticated.');
        }

        // Insert workout
        const workoutRequestObj = prepareWorkoutRequestObject(
            workoutName,
            user.id,
            exercises.length
        );
        const { data: workoutResponse, error: workoutError } = await apiClient
            .from('workouts')
            .insert(workoutRequestObj)
            .select();
        if (workoutError) {
            console.log('workout error: ', workoutError);
            throw new Error(workoutError.message);
        }

        // Insert exercises
        const exerciseRequestObj = prepareExercisesRequestObject(exercises, workoutResponse[0].id);
        console.log(exerciseRequestObj);
        const { data: exercisesResponse, error: exercisesError } = await apiClient
            .from('workout_exercises')
            .insert(exerciseRequestObj)
            .select();
        if (exercisesError) {
            console.log('exercise error: ', exercisesError);
            throw new Error(exercisesError.message);
        }

        // // Insert sets
        const exerciseSetsRequestObj = prepareExerciseSetsRequestObject(
            exercises,
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

function prepareWorkoutRequestObject(
    workoutName: string,
    userId: string,
    numExercises: number
): WorkoutInsertType {
    return {
        name: workoutName,
        user_id: userId,
        num_exercises: numExercises,
    };
}

function prepareExercisesRequestObject(
    exercises: Exercise[],
    workoutId: number
): ExerciseInsertType[] {
    return exercises.map((exercise) => {
        return {
            exercises_id: exercise.id,
            workout_id: workoutId,
            num_sets: exercise.sets.length,
        };
    });
}

function prepareExerciseSetsRequestObject(
    exercises: Exercise[],
    exercisesResponse: Array<Tables<'workout_exercises'>>
): ExerciseSetsInsertType[] {
    let exerciseSetsRequestObj: ExerciseSetsInsertType[] = [];
    exercises.forEach((exercise) => {
        exercise.sets.forEach((set, index) => {
            const workoutExercise = exercisesResponse.find((e) => e.exercises_id === exercise.id);
            if (workoutExercise) {
                exerciseSetsRequestObj = [
                    ...exerciseSetsRequestObj,
                    {
                        workout_exercises_id: workoutExercise.id,
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
