import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { ExerciseApiQueryKeys } from 'src/api/hooks';
import { queryClient } from 'src/api/react-query-client';
import { IDeleteWorkoutResponse } from 'src/api/workout-service/responses/IDeleteWorkoutResponse';
import { GET_ALL_WORKOUTS_QUERY_KEY } from 'src/api/workout-service/WorkoutApiConfig';
import * as WorkoutApi from 'src/api/workout-service/WorkoutApiService';

interface IUseDeleteWorkout {
    deleteWorkout: (workoutId: string) => void;
    isDeleting: boolean;
}

export function useDeleteWorkout(
    onSuccessCallback: (response: IDeleteWorkoutResponse) => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseDeleteWorkout {
    const { mutate: deleteWorkout, isPending: isDeleting } = useMutation<
        IDeleteWorkoutResponse,
        IErrorResponse,
        string
    >({
        mutationFn: WorkoutApi.deleteWorkout,
        onSuccess: async (response: IDeleteWorkoutResponse) => {
            await Promise.all([
                queryClient.refetchQueries({ queryKey: [GET_ALL_WORKOUTS_QUERY_KEY] }),
                queryClient.invalidateQueries({
                    queryKey: ExerciseApiQueryKeys.getExercisesWithWorkoutDetails,
                }),
                queryClient.invalidateQueries({ queryKey: ['exercises'] }),
            ]);
            onSuccessCallback(response);
        },
        onError: (error: IErrorResponse) => {
            onErrorCallback(error);
        },
    });

    return { deleteWorkout, isDeleting };
}
