import type { WorkoutForm } from 'src/interfaces';

/**
 * The function `sanitizeWorkout` filters out exercises and sets with invalid data from a workout
 * object.
 * @param {WorkoutForm} workout - The `sanitizeWorkout` function takes a `workout` object of type
 * `WorkoutForm` as a parameter. The `workout` object contains an array of exercises, where each
 * exercise has an array of sets. The function filters out exercises that have sets with no reps or
 * weight specified
 * @returns The `sanitizeWorkout` function takes a `WorkoutForm` object as input and returns a
 * sanitized version of the same object. The returned object includes the same properties as the input
 * `workout` object, but with the following modifications:
 */
export function sanitizeWorkout(workout: WorkoutForm): WorkoutForm {
    return {
        ...workout,
        exercises: workout.exercises
            .map((exercise) => ({
                ...exercise,
                // remove sets that either have empty weight or reps input
                sets: exercise.sets.filter((set) => set.reps > 0 && set.weight > 0 && set.rpe > 0),
            }))
            .filter((exercise) => exercise.sets.length > 0), // remove exercises with no sets,
    };
}
