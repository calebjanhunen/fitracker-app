import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import { IErrorResponse } from 'src/api/client';
import {
    exerciseDetailsQueryKey,
    GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY,
} from 'src/api/exercise-service/ExerciseApiConfig';
import { queryClient } from 'src/api/react-query-client';
import { GET_USER_BY_ID_QUERY_KEY } from 'src/api/user-service/UserApiConfig';
import { ICreateWorkoutRequest } from 'src/api/workout-service/requests/ICreateWorkoutRequest';
import { ICreateWorkoutResponse } from 'src/api/workout-service/responses/ICreateWorkoutResponse';
import { GET_ALL_WORKOUTS_QUERY_KEY } from 'src/api/workout-service/WorkoutApiConfig';
import * as WorkoutApiService from 'src/api/workout-service/WorkoutApiService';
import { IWorkoutFormState } from 'src/redux/workout-form/IWorkoutForm';

interface IUseCreateWorkout {
    createWorkout: ({
        workoutForm,
        duration,
    }: {
        workoutForm: IWorkoutFormState;
        duration: number;
    }) => void;
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
    } = useMutation<
        ICreateWorkoutResponse,
        IErrorResponse,
        {
            workoutForm: IWorkoutFormState;
            duration: number;
        }
    >({
        mutationFn: async ({ workoutForm, duration }) => {
            let newWorkoutForm = removeInvalidSets(workoutForm);
            newWorkoutForm = removeInvalidExercises(newWorkoutForm);
            const createWorkoutRequest = fromWorkoutFormToWorkoutRequest(newWorkoutForm, duration);
            return await WorkoutApiService.createWorkout({
                createWorkoutRequest,
            });
        },
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

            for (const exercise of response.workout.exercises) {
                await queryClient.invalidateQueries({
                    queryKey: exerciseDetailsQueryKey(exercise.id),
                });
            }

            onSuccessCallback(response);
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    function removeInvalidSets(workoutForm: IWorkoutFormState): IWorkoutFormState {
        const newWorkoutForm = _.cloneDeep(workoutForm);

        workoutForm.workout.exercises.forEach((exerciseId) => {
            workoutForm.exercises[exerciseId].sets.forEach((setId) => {
                if (!workoutForm.sets[setId].weight || !workoutForm.sets[setId].reps) {
                    newWorkoutForm.sets = _.omit(newWorkoutForm.sets, setId);
                    newWorkoutForm.exercises[exerciseId].sets = newWorkoutForm.exercises[
                        exerciseId
                    ].sets.filter((id) => id !== setId);
                }
            });
        });

        return newWorkoutForm;
    }

    function removeInvalidExercises(workoutForm: IWorkoutFormState): IWorkoutFormState {
        const newWorkoutForm = _.cloneDeep(workoutForm);

        workoutForm.workout.exercises.forEach((exerciseId) => {
            if (!workoutForm.exercises[exerciseId].sets.length) {
                newWorkoutForm.exercises = _.omit(newWorkoutForm.exercises, exerciseId);
                newWorkoutForm.workout.exercises = newWorkoutForm.workout.exercises.filter(
                    (id) => id !== exerciseId
                );
            }
        });

        return newWorkoutForm;
    }

    function fromWorkoutFormToWorkoutRequest(
        workoutForm: IWorkoutFormState,
        duration: number
    ): ICreateWorkoutRequest {
        return {
            name: workoutForm.workout.name,
            createdAt: workoutForm.workout.createdAt,
            duration,
            exercises: workoutForm.workout.exercises.map((exerciseId, index) => {
                return {
                    exerciseId,
                    order: index + 1,
                    sets: workoutForm.exercises[exerciseId].sets.map((setId, index) => {
                        return {
                            weight: workoutForm.sets[setId].weight,
                            reps: workoutForm.sets[setId].reps,
                            rpe: workoutForm.sets[setId].rpe,
                            order: index + 1,
                        };
                    }),
                };
            }),
        };
    }

    return { createWorkout, isPending, error };
}
