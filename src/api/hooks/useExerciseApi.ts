import { useMutation, useQuery } from '@tanstack/react-query';
import { IErrorResponse } from '../client';
import { ExerciseResponseDto } from '../generated';
import { queryClient } from '../react-query-client';
import { exerciseApiService } from '../services';

export const ExerciseApiQueryKeys = {
    getExercisesWithWorkoutDetails: ['exercisesWithWorkoutDetails'],
    getExerciseDetails: (exerciseId: string) => ['exercises', exerciseId, 'details'],
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

export function useGetExerciseDetails(exerciseId: string) {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => await exerciseApiService.getExerciseDetails(exerciseId),
        queryKey: ExerciseApiQueryKeys.getExerciseDetails(exerciseId),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading, error };
}

export function useCreateExercise(
    onSuccessCallback: (createdExercise: ExerciseResponseDto) => void,
    onErrorCallback: (error: IErrorResponse) => void
) {
    const {
        mutate: createExercise,
        error,
        isPending,
    } = useMutation({
        mutationFn: exerciseApiService.createExercise,
        onSuccess: async (createdExercise) => {
            await queryClient.invalidateQueries({
                queryKey: ExerciseApiQueryKeys.getExercisesWithWorkoutDetails,
            });
            onSuccessCallback(createdExercise);
        },
        onError: onErrorCallback,
    });

    return { createExercise, isPending, error };
}
