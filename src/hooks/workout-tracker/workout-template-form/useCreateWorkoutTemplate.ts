import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { queryClient } from 'src/api/react-query-client';
import { ICreateWorkoutTemplateRequest } from 'src/api/workout-template-service/requests/ICreateWorkoutTemplateRequest';
import { GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY } from 'src/api/workout-template-service/WorkoutTemplateApiConfig';
import * as WorkoutTemplateApi from 'src/api/workout-template-service/WorkoutTemplateApiService';
import { IWorkoutTemplateFormState } from 'src/redux/workout-template-form/IWorkoutTemplateForm';

interface IUseCreateWorkout {
    createWorkoutTemplate: (workoutTemplateForm: IWorkoutTemplateFormState) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useCreateWorkoutTemplate(
    onSuccessCallback: () => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseCreateWorkout {
    const {
        mutate: createWorkoutTemplate,
        error,
        isPending,
    } = useMutation<ICreateWorkoutTemplateRequest, IErrorResponse, IWorkoutTemplateFormState>({
        mutationFn: WorkoutTemplateApi.createWorkoutTemplate,
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: [GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY],
            });
            onSuccessCallback();
        },
        onError: onErrorCallback,
    });

    return { createWorkoutTemplate, isPending, error };
}
