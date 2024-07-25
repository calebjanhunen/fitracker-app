import { useQuery } from '@tanstack/react-query';
import { exercisesAPI } from 'src/api/exercises/exercises-api';
import type { ExerciseForWorkout } from 'src/interfaces';

interface IUseGetExercisesForWorkout {
    isLoading: boolean;
    exercisesForWorkout: ExerciseForWorkout[];
}

export const EXERCISES_FOR_WORKOUT_QUERY_KEY = ['exercisesForWorkout'];

export function useGetExercisesForWorkout(): IUseGetExercisesForWorkout {
    const { isLoading, data: exercisesForWorkout = [] } = useQuery<ExerciseForWorkout[]>({
        queryKey: EXERCISES_FOR_WORKOUT_QUERY_KEY,
        queryFn: exercisesAPI.getExercisesForWorkouts,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        /*
        set stale and gc time to inifinity since this data only updates on a workout being created
        (numTimeExerciseUsed is changed) or when an exercise gets created (an exercise would be added
        to the list)
        */
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { isLoading, exercisesForWorkout };
}
