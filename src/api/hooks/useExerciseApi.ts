import { useQuery } from '@tanstack/react-query';
import { exerciseApiService } from '../services';

export const ExerciseApiQueryKeys = {
    getExercisesWithWorkoutDetails: ['exercisesWithWorkoutDetails'],
};

export function useGetExercisesWithWorkoutDetails() {
    const { data, isLoading, error } = useQuery({
        queryFn: exerciseApiService.getExercisesWithWorkoutDetails,
        queryKey: ExerciseApiQueryKeys.getExercisesWithWorkoutDetails,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading, error };
}
