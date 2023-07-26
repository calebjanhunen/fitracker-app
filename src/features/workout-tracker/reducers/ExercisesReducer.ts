import uuid from 'react-native-uuid';

import { type Exercise } from '../../../interfaces/Exercise';

export enum ExercisesActionsTypes {
    ADD_EXERCISE = 'add-exercise',
    DELETE_EXERCISE = 'delete-exercise',
    DELETE_ALL_EXERCISES = 'delete-all-exercises',
}

export interface ExercisesActions {
    type: string;
    payload?: string | number[];
}

export function exercisesReducer(exercises: Exercise[], action: ExercisesActions): Exercise[] {
    const exerciseId = uuid.v4();
    switch (action.type) {
        case ExercisesActionsTypes.ADD_EXERCISE:
            return [
                ...exercises,
                {
                    name: `Exercise: ${exerciseId.toString().slice(0, 8)}`,
                    id: exerciseId,
                    sets: [],
                },
            ];
        case ExercisesActionsTypes.DELETE_EXERCISE:
            return exercises.filter((exercise) => exercise.id !== action.payload);
        case ExercisesActionsTypes.DELETE_ALL_EXERCISES:
            return [];
        default:
            return exercises;
    }
}
