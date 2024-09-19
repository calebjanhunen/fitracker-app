import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';

interface IWorkoutInProgressContext {
    isWorkoutInProgress: boolean;
    setWorkoutInProgress: (val: boolean) => void;
}

const WorkoutInProgressContext = createContext<IWorkoutInProgressContext>({
    isWorkoutInProgress: false,
    setWorkoutInProgress: () => {},
});

const IS_WORKOUT_IN_PROGRESS_STORAGE_KEY = 'is-workout-in-progress';

export default function WorkoutInProgressProvider({ children }: { children: React.ReactNode }) {
    const [isWorkoutInProgress, setIsWorkoutInProgress] = useState<boolean>(false);
    const { saveToStorage, getFromStorage, removeFromStorage } = useLocalStorage();

    useEffect(() => {
        getFromStorage(IS_WORKOUT_IN_PROGRESS_STORAGE_KEY)
            .then((response) => {
                if (response) {
                    setIsWorkoutInProgress(true);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    async function setWorkoutInProgress(val: boolean) {
        if (val) {
            await saveToStorage(IS_WORKOUT_IN_PROGRESS_STORAGE_KEY, 'true');
            setIsWorkoutInProgress(true);
        } else {
            setIsWorkoutInProgress(false);
            await removeFromStorage(IS_WORKOUT_IN_PROGRESS_STORAGE_KEY);
        }
    }

    return (
        <WorkoutInProgressContext.Provider value={{ isWorkoutInProgress, setWorkoutInProgress }}>
            {children}
        </WorkoutInProgressContext.Provider>
    );
}

export function useIsWorkoutInProgress() {
    return useContext(WorkoutInProgressContext);
}
