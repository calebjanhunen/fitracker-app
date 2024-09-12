import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface IWorkoutInProgressContext {
    isWorkoutInProgress: boolean;
    setIsWorkoutInProgress: Dispatch<SetStateAction<boolean>>;
}

const WorkoutInProgressContext = createContext<IWorkoutInProgressContext>({
    isWorkoutInProgress: false,
    setIsWorkoutInProgress: () => {},
});

export default function WorkoutInProgressProvider({ children }: { children: React.ReactNode }) {
    const [isWorkoutInProgress, setIsWorkoutInProgress] = useState<boolean>(false);

    return (
        <WorkoutInProgressContext.Provider value={{ isWorkoutInProgress, setIsWorkoutInProgress }}>
            {children}
        </WorkoutInProgressContext.Provider>
    );
}

export function useIsWorkoutInProgress() {
    return useContext(WorkoutInProgressContext);
}
