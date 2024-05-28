import { useContext, type Dispatch, type SetStateAction } from 'react';

import { WorkoutInProgressContext } from 'src/state/context/workout-in-progress-context';

interface IUseWorkoutInProgress {
    workoutInProgress: boolean;
    setWorkoutInProgress: Dispatch<SetStateAction<boolean>>;
}

export function useWorkoutInProgress(): IUseWorkoutInProgress {
    const { workoutInProgress, setWorkoutInProgress } = useContext(WorkoutInProgressContext);

    return {
        workoutInProgress,
        setWorkoutInProgress,
    };
}
