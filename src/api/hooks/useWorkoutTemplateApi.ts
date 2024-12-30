import { useMutation, useQuery } from '@tanstack/react-query';
import { IWorkoutTemplateFormState } from 'src/redux/workout-template-form/IWorkoutTemplateForm';
import { IErrorResponse } from '../client';
import { WorkoutTemplateRequestDto } from '../generated';
import { WorkoutTemplateQueryKeys } from '../QueryKeys';
import { queryClient } from '../react-query-client';
import { workoutTemplateApiService } from '../services/WorkoutTemplateApiService';

export function useGetAllWorkoutTemplates() {
    const { data, isLoading, error } = useQuery({
        queryFn: workoutTemplateApiService.getAllWorkoutTemplates,
        queryKey: WorkoutTemplateQueryKeys.getAllWorkoutTemplates,
    });

    return { data: data ?? [], isLoading, error };
}

export function useCreateWorkoutTemplate(
    onSuccessCallback: () => void,
    onErrorCallback: (error: IErrorResponse) => void
) {
    const {
        mutate: createWorkoutTemplate,
        error,
        isPending,
    } = useMutation({
        mutationFn: async (workoutTemplateForm: IWorkoutTemplateFormState) => {
            const dto = mapFromWorkoutTemplateFormToWorkoutTemplateRequest(workoutTemplateForm);
            await workoutTemplateApiService.createWorkoutTemplate(dto);
        },
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: WorkoutTemplateQueryKeys.getAllWorkoutTemplates,
            });
            onSuccessCallback();
        },
        onError: onErrorCallback,
    });

    return { createWorkoutTemplate, isPending, error };
}

export function useDeleteWorkoutTemplate(
    onSuccessCallback: () => void,
    onErrorCallback: (error: IErrorResponse) => void
) {
    const { mutate: deleteWorkoutTemplate, isPending } = useMutation({
        mutationFn: workoutTemplateApiService.deleteWorkoutTemplate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: WorkoutTemplateQueryKeys.getAllWorkoutTemplates,
            });
            onSuccessCallback();
        },
        onError: onErrorCallback,
    });

    return { deleteWorkoutTemplate, isPending };
}

function mapFromWorkoutTemplateFormToWorkoutTemplateRequest(
    workoutTemplateForm: IWorkoutTemplateFormState
): WorkoutTemplateRequestDto {
    return {
        name: workoutTemplateForm.workoutTemplate.name,
        exercises: workoutTemplateForm.workoutTemplate.exercises.map((exerciseId, index) => {
            return {
                exerciseId,
                order: index + 1,
                sets: workoutTemplateForm.exercises[exerciseId].sets.map((_, index) => {
                    return {
                        order: index + 1,
                    };
                }),
            };
        }),
    };
}
