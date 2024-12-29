/* eslint-disable @typescript-eslint/promise-function-async */
import { useMutation, useQuery } from '@tanstack/react-query';
import { IErrorResponse } from '../client';
import { ExerciseDetailsDto, ExerciseResponseDto } from '../generated';
import { queryClient } from '../react-query-client';
import { exerciseApiService } from '../services';
import { GET_ALL_WORKOUTS_QUERY_KEY } from '../workout-service/WorkoutApiConfig';
import { WorkoutTemplateQueryKeys } from './useWorkoutTemplateApi';

export const ExerciseApiQueryKeys = {
    getExercisesWithWorkoutDetails: ['exercisesWithWorkoutDetails'],
    getEquipment: ['equipment'],
    getBodyParts: ['bodyParts'],
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

export function useGetEquipmentAndBodyParts() {
    const {
        data: equipment,
        isLoading: isEquipmentLoading,
        error: equipmentError,
    } = useQuery({
        queryFn: exerciseApiService.getEquipment,
        queryKey: ExerciseApiQueryKeys.getEquipment,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const {
        data: bodyParts,
        isLoading: isBodyPartsLoading,
        error: bodyPartsError,
    } = useQuery({
        queryFn: exerciseApiService.getBodyParts,
        queryKey: ExerciseApiQueryKeys.getBodyParts,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return {
        equipment: equipment ?? [],
        bodyParts: bodyParts ?? [],
        isLoading: isBodyPartsLoading || isEquipmentLoading,
        error: bodyPartsError ?? equipmentError,
    };
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

export function useUpdateExercise(
    onSuccessCallback: (updatedExercise: ExerciseResponseDto) => void,
    onErrorCallback: (error: IErrorResponse) => void
) {
    const {
        mutate: updateExercise,
        error,
        isPending,
    } = useMutation({
        mutationFn: exerciseApiService.updateExercise,
        onSuccess: async (updatedExercise) => {
            const queryKeysToInvalidate = [
                ExerciseApiQueryKeys.getExercisesWithWorkoutDetails,
                ExerciseApiQueryKeys.getExerciseDetails(updatedExercise.id),
                WorkoutTemplateQueryKeys.getAllWorkoutTemplates,
                [GET_ALL_WORKOUTS_QUERY_KEY],
            ];
            await Promise.all(
                queryKeysToInvalidate.map((queryKey) => queryClient.invalidateQueries({ queryKey }))
            );
            onSuccessCallback(updatedExercise);

            // Update exercise details in cache to immediately reflect in ui
            queryClient.setQueryData(
                ExerciseApiQueryKeys.getExerciseDetails(updatedExercise.id),
                (oldData: ExerciseDetailsDto) => {
                    return { ...oldData, ...updatedExercise };
                }
            );
        },
        onError: onErrorCallback,
    });

    return { updateExercise, isPending, error };
}
