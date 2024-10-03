import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { queryClient } from 'src/api/react-query-client';
import { GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY } from 'src/api/workout-template-service/WorkoutTemplateApiConfig';
import * as WorkoutTemplateApi from 'src/api/workout-template-service/WorkoutTemplateApiService';

interface IUseDeleteWorkoutTemplate {
    deleteWorkoutTemplate: (workoutId: string) => void;
    isDeleting: boolean;
}

export function useDeleteWorkoutTemplate(
    onSuccessCallback: () => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseDeleteWorkoutTemplate {
    const { mutate: deleteWorkoutTemplate, isPending: isDeleting } = useMutation<
        unknown,
        IErrorResponse,
        string
    >({
        mutationFn: WorkoutTemplateApi.deleteWorkoutTemplate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY],
            });
            onSuccessCallback();
        },
        onError: (error: IErrorResponse) => {
            onErrorCallback(error);
        },
    });

    return { deleteWorkoutTemplate, isDeleting };
}
