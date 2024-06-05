import { useQuery } from '@tanstack/react-query';
import { workoutsAPI } from 'src/api/workouts/workouts-api';
import type { Workout } from 'src/interfaces';

interface IUseGetWorkouts {
    workouts: Workout[] | undefined;
    isLoading: boolean;
    error: string | undefined;
}

export const WORKOUTS_QUERY_KEY = ['workouts'];

export function useGetWorkouts(): IUseGetWorkouts {
    const {
        isLoading,
        error,
        data: workouts,
    } = useQuery<Workout[], Error>({
        queryKey: WORKOUTS_QUERY_KEY,
        queryFn: workoutsAPI.getWorkouts,
    });

    return { isLoading, error: error?.message, workouts };
}
