import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from 'src/api/client';
import { GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY } from 'src/api/exercise-service/ExerciseApiConfig';
import * as ExerciseApi from 'src/api/exercise-service/ExerciseApiService';
import { IExerciseRequest } from 'src/api/exercise-service/interfaces/requests/IExerciseRequest';
import { IExerciseResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import { queryClient } from 'src/api/react-query-client';

interface IUseCreateExercise {
    createExercise: (exercise: IExerciseRequest) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useCreateExercise(
    onSuccessCallback: () => void,
    onErrorCallback: (error: IErrorResponse) => void
): IUseCreateExercise {
    const {
        mutate: createExercise,
        error,
        isPending,
    } = useMutation<IExerciseResponse, IErrorResponse, IExerciseRequest>({
        mutationFn: ExerciseApi.createExercise,
        onSuccess: async (data) => {
            console.log(data);

            await queryClient.invalidateQueries({
                queryKey: [GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY],
            });
            onSuccessCallback();
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    return { createExercise, isPending, error };
}
