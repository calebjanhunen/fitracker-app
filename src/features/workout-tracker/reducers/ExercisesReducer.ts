import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

import { type Exercise } from '../../../interfaces/Exercise';

export enum ExercisesActionsTypes {
    ADD_EXERCISE = 'add-exercise',
    DELETE_EXERCISE = 'delete-exercise',
    DELETE_ALL_EXERCISES = 'delete-all-exercises',
}

export interface ExercisesActions {
    type: string;
    payload?: {
        id?: string | number[];
        name?: string;
        numSets?: number;
    };
}

export function exercisesReducer(exercises: Exercise[], action: ExercisesActions): Exercise[] {
    const exerciseId = uuid.v4();
    switch (action.type) {
        case ExercisesActionsTypes.ADD_EXERCISE:
            return [
                ...exercises,
                {
                    name: action.payload?.name ?? `Exercise: ${exerciseId.toString().slice(0, 8)}`,
                    id: action.payload?.id ?? exerciseId,
                    numSets: action.payload?.numSets ?? 1,
                    sets: [],
                },
            ];
        case ExercisesActionsTypes.DELETE_EXERCISE:
            return exercises.filter((exercise) => exercise.id !== action.payload?.id);
        case ExercisesActionsTypes.DELETE_ALL_EXERCISES:
            return [];
        default:
            return exercises;
    }
}
