/* eslint-disable @typescript-eslint/promise-function-async */
import { useMutation, useQuery } from '@tanstack/react-query';
import { IErrorResponse } from '../client';
import { ExerciseDetailsDto, ExerciseResponseDto } from '../generated';
import { ExerciseApiQueryKeys, WorkoutApiQueryKeys, WorkoutTemplateQueryKeys } from '../QueryKeys';
import { queryClient } from '../react-query-client';
import { exerciseApiService } from '../services';

const GET_EXERCISE_DETAILS_STALE_TIME_MS = 300000;
const GET_ALL_EXERCISES_STALE_TIME = 300000;

export function useGetAllExercises() {
    const { data, isLoading, error } = useQuery({
        queryFn: exerciseApiService.getAllExercises,
        queryKey: ExerciseApiQueryKeys.getAllExercises,
        staleTime: GET_ALL_EXERCISES_STALE_TIME,
    });

    return { data: data ?? [], isLoading, error };
}

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
        queryFn: async () => await exerciseApiService.getExerciseDetails(exerciseId, false),
        queryKey: ExerciseApiQueryKeys.getExerciseDetails(exerciseId),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading, error };
}

export function useGetExerciseDetailsV2(exerciseId: string | undefined, isVariation: boolean) {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            if (!exerciseId) {
                return;
            }
            return await exerciseApiService.getExerciseDetails(exerciseId, isVariation);
        },
        queryKey: ExerciseApiQueryKeys.getExerciseDetails(exerciseId ?? ''),
        staleTime: GET_EXERCISE_DETAILS_STALE_TIME_MS,
        enabled: !!exerciseId,
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

export function useGetCableAttachments() {
    const { data } = useQuery({
        queryFn: exerciseApiService.getCableAttachments,
        queryKey: ExerciseApiQueryKeys.getCableAttachments,
        staleTime: Infinity,
    });

    return { cableAttachments: data ?? [] };
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
                WorkoutApiQueryKeys.getWorkouts,
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
