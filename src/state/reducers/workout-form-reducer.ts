import uuid from 'react-native-uuid';
import { type ExerciseInWorkout, type SetInWorkout } from 'src/interfaces/workout';
import { type WorkoutForm } from 'src/interfaces/workout-form';

export enum WorkoutFormActionTypes {
    UPDATE_NAME = 'update-name',
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
    ADD_SET = 'add-set',
    UPDATE_SET = 'update-set',
    DELETE_SET = 'delete-set',
    CLEAR_WORKOUT = 'clear-workout',
    UPDATE_CREATED_AT = 'update-created-at',
    REORDER_EXERCISES = 'reorder-exercises',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type WorkoutFormActions =
    | { type: WorkoutFormActionTypes.UPDATE_NAME; name: string }
    | { type: WorkoutFormActionTypes.ADD_EXERCISES; payload: ExerciseInWorkout[] }
    | { type: WorkoutFormActionTypes.DELETE_EXERCISE; payload: string }
    | { type: WorkoutFormActionTypes.ADD_SET; payload: string }
    | { type: WorkoutFormActionTypes.CLEAR_WORKOUT }
    | { type: WorkoutFormActionTypes.UPDATE_CREATED_AT }
    | {
          type: WorkoutFormActionTypes.UPDATE_SET;
          exerciseId: string;
          setId: string;
          updates: Record<string, number>;
      }
    | {
          type: WorkoutFormActionTypes.DELETE_SET;
          exerciseId: string;
          setId: string;
      }
    | { type: WorkoutFormActionTypes.CLEAR_WORKOUT }
    | {
          type: WorkoutFormActionTypes.REORDER_EXERCISES;
          exercises: ExerciseInWorkout[];
      };

export function reducer(workout: WorkoutForm, action: WorkoutFormActions): WorkoutForm {
    switch (action.type) {
        case WorkoutFormActionTypes.UPDATE_NAME:
            return { ...workout, name: action.name };
        case WorkoutFormActionTypes.ADD_EXERCISES:
            return { ...workout, exercises: [...workout.exercises, ...action.payload] };
        case WorkoutFormActionTypes.DELETE_EXERCISE:
            return {
                ...workout,
                exercises: workout.exercises.filter((exercise) => exercise.id !== action.payload),
            };
        case WorkoutFormActionTypes.REORDER_EXERCISES:
            return {
                ...workout,
                exercises: action.exercises,
            };
        case WorkoutFormActionTypes.ADD_SET: {
            const newSet: SetInWorkout = { id: uuid.v4().toString(), weight: 0, reps: 0, rpe: 0 };
            return {
                ...workout,
                exercises: workout.exercises.map((exercise) =>
                    exercise.id === action.payload
                        ? { ...exercise, sets: [...exercise.sets, newSet] }
                        : exercise
                ),
            };
        }
        case WorkoutFormActionTypes.UPDATE_SET: {
            const newExercises = workout.exercises.map((exercise) => {
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
            return {
                ...workout,
                exercises: newExercises,
            };
        }
        case WorkoutFormActionTypes.DELETE_SET:
            return {
                ...workout,
                exercises: workout.exercises.map((exercise) => {
                    if (exercise.id === action.exerciseId) {
                        return {
                            ...exercise,
                            sets: exercise.sets.filter((set) => set.id !== action.setId),
                        };
                    }
                    return exercise;
                }),
            };
        case WorkoutFormActionTypes.CLEAR_WORKOUT:
            return {
                name: '',
                createdAt: '',
                exercises: [],
            };
        case WorkoutFormActionTypes.UPDATE_CREATED_AT:
            return {
                ...workout,
                createdAt: new Date().toISOString(),
            };
        default:
            return workout;
    }
}
