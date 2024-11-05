import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import {
    exerciseDetailsQueryKey,
    GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY,
} from 'src/api/exercise-service/ExerciseApiConfig';
import * as ExerciseApiService from 'src/api/exercise-service/ExerciseApiService';
import { IUpdateExerciseRequest } from 'src/api/exercise-service/interfaces/requests/IUpdateExerciseRequest';
import { IExerciseResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import { IExerciseDetailsResponse } from 'src/api/exercise-service/interfaces/responses/IExerciseWorkoutHistoryResponse';
import { queryClient } from 'src/api/react-query-client';
import { GET_ALL_WORKOUTS_QUERY_KEY } from 'src/api/workout-service/WorkoutApiConfig';
import { GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY } from 'src/api/workout-template-service/WorkoutTemplateApiConfig';

interface IUseUpdateExercise {
    updateExercise: (exercise: IUpdateExerciseRequest) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useUpdateExercise(
    onSuccessCallback: (updatedExercise: IExerciseResponse) => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseUpdateExercise {
    const {
        mutate: updateExercise,
        error,
        isPending,
    } = useMutation<IExerciseResponse, IErrorResponse, IUpdateExerciseRequest>({
        mutationFn: ExerciseApiService.updateExercise,
        onSuccess: async (updatedExercise) => {
            await queryClient.invalidateQueries({
                queryKey: [GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY],
            });
            await queryClient.invalidateQueries({
                queryKey: [exerciseDetailsQueryKey(updatedExercise.id)],
            });
            await queryClient.invalidateQueries({
                queryKey: [GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY],
            });
            await queryClient.invalidateQueries({ queryKey: [GET_ALL_WORKOUTS_QUERY_KEY] });
            onSuccessCallback(updatedExercise);

            // Update exercise details in cache to immediately reflect in ui
            queryClient.setQueryData(
                exerciseDetailsQueryKey(updatedExercise.id),
                (oldData: IExerciseDetailsResponse) => {
                    return { ...oldData, ...updatedExercise };
                }
            );
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    return { updateExercise, isPending, error };
}
