import { type Exercise } from 'src/interfaces/exercise';

export enum WorkoutFormActionTypes {
    ADD_EXERCISES = 'add-exerciseS',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type WorkoutFormActions = { type: WorkoutFormActionTypes.ADD_EXERCISES; payload: Exercise[] };

export function reducer(exercises: Exercise[], action: WorkoutFormActions): Exercise[] {
    switch (action.type) {
        case WorkoutFormActionTypes.ADD_EXERCISES:
            return [...exercises, ...action.payload];
        default:
            return exercises;
    }
}
