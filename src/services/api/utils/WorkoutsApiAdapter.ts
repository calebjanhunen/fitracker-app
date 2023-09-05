import { type Exercise } from '../../../interfaces/Exercise';
import { type Tables } from '../../../interfaces/Tables';
import {
    type ExerciseInsertType,
    type ExerciseSetsInsertType,
    type WorkoutInsertType,
} from '../../../interfaces/Workout';

// Loops through exercise sets and if all sets are invalid (both reps and sets are empty) or if exercise has no sets -> sets exercise to invalid
export function validateExercises(workoutExercises: Exercise[]): Exercise[] {
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

export function toWorkoutsApiObject(workoutName: string, userId: string): WorkoutInsertType {
    return {
        name: workoutName,
        user_id: userId,
    };
}

export function toExercisesApiObject(
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

export function toExerciseSetsApiObject(
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
