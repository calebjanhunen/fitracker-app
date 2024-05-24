import { type ExerciseInWorkout } from 'src/interfaces/workout';

export enum WorkoutFormActionTypes {
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type WorkoutFormActions =
    | { type: WorkoutFormActionTypes.ADD_EXERCISES; payload: ExerciseInWorkout[] }
    | { type: WorkoutFormActionTypes.DELETE_EXERCISE; payload: string };

export function reducer(
    exercises: ExerciseInWorkout[],
    action: WorkoutFormActions
): ExerciseInWorkout[] {
    switch (action.type) {
        case WorkoutFormActionTypes.ADD_EXERCISES:
            return [...exercises, ...action.payload];
        case WorkoutFormActionTypes.DELETE_EXERCISE:
            return exercises.filter((exercise) => exercise.id !== action.payload);
        default:
            return exercises;
    }
}
