import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY } from 'src/api/exercise-service/ExerciseApiConfig';
import { queryClient } from 'src/api/react-query-client';
import { GET_USER_BY_ID_QUERY_KEY } from 'src/api/user-service/UserApiConfig';
import { ICreateWorkoutResponse } from 'src/api/workout-service/responses/ICreateWorkoutResponse';
import { GET_ALL_WORKOUTS_QUERY_KEY } from 'src/api/workout-service/WorkoutApiConfig';
import * as WorkoutApiService from 'src/api/workout-service/WorkoutApiService';
import { IWorkoutFormState } from 'src/redux/workout-form/IWorkoutForm';

interface IUseCreateWorkout {
    createWorkout: (workoutForm: IWorkoutFormState) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useCreateWorkout(
    onSuccessCallback: (response: ICreateWorkoutResponse) => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseCreateWorkout {
    const {
        mutate: createWorkout,
        error,
        isPending,
    } = useMutation<ICreateWorkoutResponse, IErrorResponse, IWorkoutFormState>({
        mutationFn: WorkoutApiService.createWorkout,
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: [GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY],
            });
            await queryClient.invalidateQueries({
                queryKey: [GET_USER_BY_ID_QUERY_KEY],
            });
            await queryClient.invalidateQueries({
                queryKey: [GET_ALL_WORKOUTS_QUERY_KEY],
            });

            onSuccessCallback(response);
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    return { createWorkout, isPending, error };
}
