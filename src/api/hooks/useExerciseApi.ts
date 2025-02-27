/* eslint-disable @typescript-eslint/promise-function-async */
import { useMutation, useQuery } from '@tanstack/react-query';
import { IErrorResponse } from '../client';
import { ExerciseResponseDto } from '../generated';
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

export function useGetExerciseDetailsV2(exerciseId: string, isVariation: boolean) {
    const { data, isLoading, error } = useQuery({
        queryFn: () => exerciseApiService.getExerciseDetails(exerciseId, isVariation),
        queryKey: ExerciseApiQueryKeys.getExerciseDetails(exerciseId),
        staleTime: GET_EXERCISE_DETAILS_STALE_TIME_MS,
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
    onErrorCallback?: (error: IErrorResponse) => void
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
            await queryClient.refetchQueries({
                queryKey: ExerciseApiQueryKeys.getAllExercises,
            });
            onSuccessCallback(createdExercise);
        },
        onError: onErrorCallback,
    });

    return { createExercise, isPending, error };
}

export function useCreateExerciseVariation(
    onSuccessCallback: () => void,
    onErrorCallback?: (error: IErrorResponse) => void
) {
    const { mutate: createExerciseVariation, isPending } = useMutation({
        mutationFn: exerciseApiService.createExerciseVariation,
        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: ExerciseApiQueryKeys.getAllExercises,
            });
            onSuccessCallback();
        },
        onError: onErrorCallback,
    });

    return { createExerciseVariation, isPending };
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
                WorkoutTemplateQueryKeys.getAllWorkoutTemplates,
                WorkoutApiQueryKeys.getWorkouts,
            ];
            await Promise.all(
                queryKeysToInvalidate.map((queryKey) =>
                    queryClient.invalidateQueries({ queryKey, exact: true })
                )
            );

            const queriesToRefetch = [
                ExerciseApiQueryKeys.getAllExercises,
                ExerciseApiQueryKeys.getExerciseDetails(updatedExercise.id),
            ];
            await Promise.all(
                queriesToRefetch.map((queryKey) =>
                    queryClient.refetchQueries({ queryKey, exact: true })
                )
            );
            onSuccessCallback(updatedExercise);
        },
        onError: onErrorCallback,
    });

    return { updateExercise, isPending, error };
}
