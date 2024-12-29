import { useMutation, useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { IWorkoutFormState } from 'src/redux/workout-form/IWorkoutForm';
import { IErrorResponse } from '../client';
import { CreateWorkoutResponseDto, WorkoutRequestDto } from '../generated';
import { queryClient } from '../react-query-client';
import { workoutApiService } from '../services';
import { ExerciseApiQueryKeys } from './useExerciseApi';

export const WorkoutApiQueryKeys = {
    getWorkouts: ['workouts'],
};

export function useGetWorkouts() {
    const { data, isLoading, error, isSuccess } = useQuery({
        queryFn: workoutApiService.getWorkouts,
        queryKey: WorkoutApiQueryKeys.getWorkouts,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading, error, isSuccess };
}

export function useCreateWorkout(
    onSuccessCallback: (response: CreateWorkoutResponseDto) => void,
    onErrorCallback: (error: IErrorResponse) => void
) {
    const {
        mutate: createWorkout,
        error,
        isPending,
    } = useMutation<
        CreateWorkoutResponseDto,
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
            return await workoutApiService.createWorkout(createWorkoutRequest);
        },
        onSuccess: async (response) => {
            await queryClient.invalidateQueries({
                queryKey: ExerciseApiQueryKeys.getExercisesWithWorkoutDetails,
            });
            await queryClient.invalidateQueries({
                queryKey: WorkoutApiQueryKeys.getWorkouts,
            });
            for (const exercise of response.workout.exercises) {
                await queryClient.invalidateQueries({
                    queryKey: ExerciseApiQueryKeys.getExerciseDetails(exercise.id),
                });
            }
            onSuccessCallback(response);
        },
        onError: onErrorCallback,
    });

    return { createWorkout, isPending, error };
}

// Helper functions for creating workout... TODO: move to different file?
function removeInvalidSets(workoutForm: IWorkoutFormState): IWorkoutFormState {
    const newWorkoutForm = _.cloneDeep(workoutForm);

    workoutForm.workout.exercises.forEach((exerciseId) => {
        workoutForm.exercises[exerciseId].sets.forEach((setId) => {
            if (workoutForm.sets[setId].weight === null || !workoutForm.sets[setId].reps) {
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
): WorkoutRequestDto {
    return {
        name: workoutForm.workout.name,
        createdAt: workoutForm.workout.createdAt,
        lastUpdatedAt: workoutForm.workout.lastUpdatedAt,
        duration,
        exercises: workoutForm.workout.exercises.map((exerciseId, index) => {
            return {
                exerciseId,
                order: index + 1,
                sets: workoutForm.exercises[exerciseId].sets.map((setId, index) => {
                    return {
                        // shouldn't default to 0 because sets with null weight are removed in `removeInvalidSets`
                        weight: workoutForm.sets[setId].weight ?? 0,
                        // shouldn't default to 0 because sets with null reps are removed in `removeInvalidSets`
                        reps: workoutForm.sets[setId].reps ?? 0,
                        rpe: workoutForm.sets[setId].rpe,
                        order: index + 1,
                    };
                }),
            };
        }),
    };
}
