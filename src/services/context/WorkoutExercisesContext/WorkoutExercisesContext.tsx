import React, { createContext, useReducer, type Dispatch } from 'react';

import { type Exercise } from '../../../interfaces/Exercise';
import { exercisesReducer, type ExercisesActions } from './ExercisesReducer';

interface Props {
    children: React.ReactNode;
}

interface ExerciseContextData {
    workoutExercises: Exercise[];
    dispatchExercises: Dispatch<ExercisesActions>;
}

export const WorkoutExercisesContext = createContext<ExerciseContextData>(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as ExerciseContextData
);

export default function WorkoutExercisesProvider({ children }: Props): React.ReactElement {
    const [exercises, dispatch] = useReducer(exercisesReducer, []);

    return (
        <WorkoutExercisesContext.Provider
            value={{ workoutExercises: exercises, dispatchExercises: dispatch }}
        >
            {children}
        </WorkoutExercisesContext.Provider>
    );
}
