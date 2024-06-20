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
            const newExerciseForWorkout: ExerciseForWorkout = {
                name: data.name,
                id: data.id,
                primaryMuscle: data.primaryMuscle,
                previousSets: [],
                numTimesUsed: 0,
            };

            // Add created exercise to exercise display in alphabetical order
            setExercisesDisplay((prev) =>
                [...prev, newExerciseForWorkout].sort((a, b) => (a.name > b.name ? 1 : -1))
            );

            // Add created exercise to selected exercises
            addExerciseToSelectedExercises(newExerciseForWorkout);

            await queryClient.refetchQueries({ queryKey: EXERCISES_FOR_WORKOUT_QUERY_KEY });
        },
        onError: (e) => {
            Alert.alert('Could Not Save Exercise', e.message);
        },
    });

    return { createExercise, isSaving };
}
