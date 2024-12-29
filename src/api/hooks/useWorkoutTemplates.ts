import { useMutation, useQuery } from '@tanstack/react-query';
import { IWorkoutTemplateFormState } from 'src/redux/workout-template-form/IWorkoutTemplateForm';
import { apiClient, IErrorResponse } from '../client';
import { WorkoutTemplateRequestDto, WorkoutTemplatesApi } from '../generated';
import { queryClient } from '../react-query-client';

export const WorkoutTemplateQueryKeys = {
    getAllWorkoutTemplates: ['workoutTemplates'],
};

const workoutTemplatesApi = new WorkoutTemplatesApi(undefined, undefined, apiClient);

export function useGetAllWorkoutTemplates() {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            const response = await workoutTemplatesApi.getAllWorkoutTemplates();
            return response.data;
        },
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
            await workoutTemplatesApi.createWorkoutTemplate(dto);
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
