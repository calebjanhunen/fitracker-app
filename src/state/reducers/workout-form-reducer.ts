import uuid from 'react-native-uuid';
import { type ExerciseInWorkout, type SetInWorkout } from 'src/interfaces/workout';

export enum WorkoutFormActionTypes {
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
    ADD_SET = 'add-set',
    UPDATE_SET = 'update-set',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type WorkoutFormActions =
    | { type: WorkoutFormActionTypes.ADD_EXERCISES; payload: ExerciseInWorkout[] }
    | { type: WorkoutFormActionTypes.DELETE_EXERCISE; payload: string }
    | { type: WorkoutFormActionTypes.ADD_SET; payload: string }
    | {
          type: WorkoutFormActionTypes.UPDATE_SET;
          exerciseId: string;
          setId: string;
          updates: Record<string, number>;
      };

export function reducer(
    exercises: ExerciseInWorkout[],
    action: WorkoutFormActions
): ExerciseInWorkout[] {
    switch (action.type) {
        case WorkoutFormActionTypes.ADD_EXERCISES:
            return [...exercises, ...action.payload];
        case WorkoutFormActionTypes.DELETE_EXERCISE:
            return exercises.filter((exercise) => exercise.id !== action.payload);
        case WorkoutFormActionTypes.ADD_SET: {
            const newSet: SetInWorkout = { id: uuid.v4().toString(), weight: 0, reps: 0, rpe: 0 };
            return exercises.map((exercise) =>
                exercise.id === action.payload
                    ? { ...exercise, sets: [...exercise.sets, newSet] }
                    : exercise
            );
        }
        case WorkoutFormActionTypes.UPDATE_SET:
            return exercises.map((exercise) => {
                if (exercise.id === action.exerciseId) {
                    return {
                        ...exercise,
                        sets: exercise.sets.map((set) => {
                            if (set.id === action.setId) {
                                return { ...set, ...action.updates };
                            }
                            return set;
                        }),
                    };
                }
                return exercise;
            });
        default:
            return exercises;
    }
}
