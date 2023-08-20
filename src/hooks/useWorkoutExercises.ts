import { useReducer } from 'react';

import { type Exercise } from '../interfaces/Exercise';

enum ExercisesActionsTypes {
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
    DELETE_ALL_EXERCISES = 'delete-all-exercises',
}

type ExercisesActions =
    | {
          type: ExercisesActionsTypes.ADD_EXERCISES;
          payload: Exercise[];
      }
    | {
          type: ExercisesActionsTypes.DELETE_EXERCISE;
          payload: { id: number };
      }
    | {
          type: ExercisesActionsTypes.DELETE_ALL_EXERCISES;
      };

interface UseWorkoutExercises {
    workoutExercises: Exercise[];
    addExercisesToWorkout: (exercises: Exercise[]) => void;
    deleteAllExercises: () => void;
    deleteExercise: (id: number) => void;
}

export function useWorkoutExercises(): UseWorkoutExercises {
    const [workoutExercises, dispatchWorkoutExercises] = useReducer(exercisesReducer, []);

    function exercisesReducer(exercises: Exercise[], action: ExercisesActions): Exercise[] {
        switch (action.type) {
            case ExercisesActionsTypes.ADD_EXERCISES:
                return [...exercises, ...action.payload];
            case ExercisesActionsTypes.DELETE_EXERCISE:
                return exercises.filter((exercise) => exercise.id !== action.payload?.id);
            case ExercisesActionsTypes.DELETE_ALL_EXERCISES:
                return [];
            default:
                return exercises;
        }
    }

    function addExercisesToWorkout(exercises: Exercise[]): void {
        dispatchWorkoutExercises({ type: ExercisesActionsTypes.ADD_EXERCISES, payload: exercises });
    }

    function deleteAllExercises(): void {
        dispatchWorkoutExercises({ type: ExercisesActionsTypes.DELETE_ALL_EXERCISES });
    }

    function deleteExercise(id: number): void {
        dispatchWorkoutExercises({ type: ExercisesActionsTypes.DELETE_EXERCISE, payload: { id } });
    }

    return { workoutExercises, addExercisesToWorkout, deleteExercise, deleteAllExercises };
}
