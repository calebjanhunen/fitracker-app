import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY } from 'src/api/exercise-service/ExerciseApiConfig';
import { queryClient } from 'src/api/react-query-client';
import { GET_USER_BY_ID_QUERY_KEY } from 'src/api/user-service/UserApiConfig';
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
                queryClient.refetchQueries({ queryKey: [GET_USER_BY_ID_QUERY_KEY] }),
                queryClient.invalidateQueries({
                    queryKey: [GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY],
                }),
            ]);
            onSuccessCallback(response);
        },
        onError: (error: IErrorResponse) => {
            onErrorCallback(error);
        },
    });

    return { deleteWorkout, isDeleting };
}
