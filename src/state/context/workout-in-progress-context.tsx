/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

interface Props {
    children: React.ReactNode;
}

interface IWorkoutInProgressContext {
    workoutInProgress: boolean;
    setWorkoutInProgress: Dispatch<SetStateAction<boolean>>;
}

export const WorkoutInProgressContext = createContext<IWorkoutInProgressContext>(
    {} as IWorkoutInProgressContext
);

export function WorkoutInProgressProvider({ children }: Props): React.ReactElement {
    const [workoutInProgress, setWorkoutInProgress] = useState<boolean>(false);

    return (
        <WorkoutInProgressContext.Provider value={{ workoutInProgress, setWorkoutInProgress }}>
            {children}
        </WorkoutInProgressContext.Provider>
    );
}
