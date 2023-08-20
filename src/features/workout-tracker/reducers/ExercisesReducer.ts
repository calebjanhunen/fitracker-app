import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

import { type Exercise } from '../../../interfaces/Exercise';

export enum ExercisesActionsTypes {
    ADD_EXERCISES = 'add-exercises',
    DELETE_EXERCISE = 'delete-exercise',
    DELETE_ALL_EXERCISES = 'delete-all-exercises',
}

export type ExercisesActions =
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

export function exercisesReducer(exercises: Exercise[], action: ExercisesActions): Exercise[] {
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
