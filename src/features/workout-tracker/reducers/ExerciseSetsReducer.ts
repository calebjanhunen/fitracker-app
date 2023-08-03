import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

import { type ExerciseSet } from '../../../interfaces/Exercise';

export enum ExerciseSetsActionsTypes {
    ADD_SET = 'add-set',
    DELETE_SET = 'delete-set',
}

export interface ExerciseSetsActions {
    type: string;
    payload?: {
        id: string | number[];
        weight?: number;
        reps?: number;
        rpe?: number;
    };
}

export function exerciseSetsReducer(
    exerciseSets: ExerciseSet[],
    action: ExerciseSetsActions
): ExerciseSet[] {
    switch (action.type) {
        case ExerciseSetsActionsTypes.ADD_SET:
            return [
                ...exerciseSets,
                { id: uuid.v4(), reps: null, weight: null, rpe: null, previous: null },
            ];
        case ExerciseSetsActionsTypes.DELETE_SET:
            return exerciseSets.filter((set) => set.id !== action.payload?.id);
        default:
            return exerciseSets;
    }
}
