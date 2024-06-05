import { useQuery } from '@tanstack/react-query';
import { workoutsAPI } from 'src/api/workouts/workouts-api';
import type { ExerciseForWorkout } from 'src/interfaces';

interface IUseGetExercisesForWorkout {
    isLoading: boolean;
    exercisesForWorkout: ExerciseForWorkout[];
}

export const EXERCISES_FOR_WORKOUT_QUERY_KEY = ['exercisesForWorkout'];

export function useGetExercisesForWorkout(): IUseGetExercisesForWorkout {
    const { isLoading, data: exercisesForWorkout = [] } = useQuery<ExerciseForWorkout[]>({
        queryKey: EXERCISES_FOR_WORKOUT_QUERY_KEY,
        queryFn: workoutsAPI.getExercisesForWorkouts,
    });

    return { isLoading, exercisesForWorkout };
}
