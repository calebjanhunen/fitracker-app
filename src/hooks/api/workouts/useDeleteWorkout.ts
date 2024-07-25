import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'src/api/config/react-query.config';
import { workoutsAPI } from 'src/api/workouts/workouts-api';
import { EXERCISES_FOR_WORKOUT_QUERY_KEY } from '../exercises/useGetExercisesForWorkout';
import { WORKOUTS_QUERY_KEY } from './useGetWorkouts';

interface IUseDeleteWorkout {
    deleteWorkout: (workoutId: string) => void;
    isLoading: boolean;
}

export function useDeleteWorkout(): IUseDeleteWorkout {
    const { mutate: deleteWorkout, isPending: isLoading } = useMutation({
        mutationFn: workoutsAPI.deleteWorkout,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY });
            await queryClient.invalidateQueries({ queryKey: EXERCISES_FOR_WORKOUT_QUERY_KEY });
        },
    });

    return {
        isLoading,
        deleteWorkout,
    };
}
