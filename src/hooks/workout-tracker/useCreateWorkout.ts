import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY } from 'src/api/exercise-service/ExerciseApiConfig';
import { queryClient } from 'src/api/react-query-client';
import { IWorkoutResponse } from 'src/api/workout-service/responses/IWorkoutResponse';
import * as WorkoutApiService from 'src/api/workout-service/WorkoutApiService';
import { IWorkoutFormState } from 'src/redux/workout-form/IWorkoutForm';

interface IUseCreateWorkout {
    createWorkout: (workoutForm: IWorkoutFormState) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useCreateWorkout(
    onSuccessCallback: () => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseCreateWorkout {
    const {
        mutate: createWorkout,
        error,
        isPending,
    } = useMutation<IWorkoutResponse, IErrorResponse, IWorkoutFormState>({
        mutationFn: WorkoutApiService.createWorkout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY],
            });
            onSuccessCallback();
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    return { createWorkout, isPending, error };
}
