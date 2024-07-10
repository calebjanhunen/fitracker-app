import type { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { queryClient } from 'src/api/config/react-query.config';
import { exercisesAPI } from 'src/api/exercises/exercises-api';
import type { ExerciseForWorkout } from 'src/interfaces';
import { EXERCISES_FOR_WORKOUT_QUERY_KEY } from '../workouts/useGetExercisesForWorkout';

interface IUseCreateExercise {
    createExercise: ({
        name,
        primaryMuscle,
        equipment,
    }: {
        name: string;
        primaryMuscle: string;
        equipment: string;
    }) => void;
    isSaving: boolean;
}

export function useCreateExercise(
    setExercisesDisplay: Dispatch<SetStateAction<ExerciseForWorkout[]>>,
    addExerciseToSelectedExercises: (exercise: ExerciseForWorkout) => void
): IUseCreateExercise {
    const { mutate: createExercise, isPending: isSaving } = useMutation({
        mutationFn: exercisesAPI.createExercise,
        onSuccess: async (data) => {
            // Refetch and get new exercises from cache
            await queryClient.refetchQueries({ queryKey: EXERCISES_FOR_WORKOUT_QUERY_KEY });
            const exercisesWithCreatedExercise = queryClient.getQueryData<ExerciseForWorkout[]>(
                EXERCISES_FOR_WORKOUT_QUERY_KEY
            );

            let newExercise: ExerciseForWorkout | undefined;

            // Set the exercises display to the new exercises list (with the new exercise)
            if (exercisesWithCreatedExercise) {
                setExercisesDisplay(exercisesWithCreatedExercise);

                // Get new exercise that was created
                newExercise = exercisesWithCreatedExercise.find((e) => e.id === data.id);
            } else {
                Alert.alert('Failed to fetch exercises from cache');
            }

            // Add new exercise to selected exercises
            if (newExercise) {
                addExerciseToSelectedExercises(newExercise);
            } else {
                Alert.alert('Created exercise does not exist in list of exercises');
            }
        },
        onError: (e) => {
            Alert.alert('Could Not Save Exercise', e.message);
        },
    });

    return { createExercise, isSaving };
}
