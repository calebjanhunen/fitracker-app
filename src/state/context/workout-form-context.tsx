/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, useReducer, type Dispatch } from 'react';

import { type WorkoutForm } from 'src/interfaces/workout-form';
import { reducer, type WorkoutFormActions } from '../reducers/workout-form-reducer';

interface Props {
    children: React.ReactNode;
}

interface IWorkoutFormContext {
    workout: WorkoutForm;
    dispatch: Dispatch<WorkoutFormActions>;
}

export const WorkoutFormContext = createContext<IWorkoutFormContext>({} as IWorkoutFormContext);

export function WorkoutFormProvider({ children }: Props): React.ReactElement {
    const [workout, dispatchWorkout] = useReducer(reducer, {
        createdAt: '',
        name: '',
        exercises: [],
    });

    return (
        <WorkoutFormContext.Provider
            value={{
                workout,
                dispatch: dispatchWorkout,
            }}
        >
            {children}
        </WorkoutFormContext.Provider>
    );
}
