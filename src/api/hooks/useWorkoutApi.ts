import { useQuery } from '@tanstack/react-query';
import { workoutApiService } from '../services';

export const WorkoutApiQueryKeys = {
    getWorkouts: ['workouts'],
};

export function useGetWorkouts() {
    const { data, isLoading, error, isSuccess } = useQuery({
        queryFn: workoutApiService.getWorkouts,
        queryKey: WorkoutApiQueryKeys.getWorkouts,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading, error, isSuccess };
}
