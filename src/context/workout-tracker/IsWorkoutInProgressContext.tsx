import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocalStorageKeys } from 'src/constants/LocalStorageKeys';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';

interface IWorkoutInProgressContext {
    isWorkoutInProgress: boolean;
    setWorkoutInProgress: (val: boolean) => void;
}

const WorkoutInProgressContext = createContext<IWorkoutInProgressContext>({
    isWorkoutInProgress: false,
    setWorkoutInProgress: () => {},
});

export default function WorkoutInProgressProvider({ children }: { children: React.ReactNode }) {
    const [isWorkoutInProgress, setIsWorkoutInProgress] = useState<boolean>(false);
    const { saveToStorage, getFromStorage, removeFromStorage } = useLocalStorage();

    useEffect(() => {
        getFromStorage(LocalStorageKeys.isWorkoutInProgress)
            .then((response) => {
                if (response) {
                    setIsWorkoutInProgress(true);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    async function setWorkoutInProgress(val: boolean) {
        if (val) {
            await saveToStorage(LocalStorageKeys.isWorkoutInProgress, 'true');
            setIsWorkoutInProgress(true);
        } else {
            setIsWorkoutInProgress(false);
            await removeFromStorage(LocalStorageKeys.isWorkoutInProgress);
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
