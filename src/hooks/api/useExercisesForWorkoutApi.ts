import { useEffect, useState } from 'react';
import { workoutsAPI } from 'src/api/workouts/workouts-api';
import type { ExerciseForWorkout } from 'src/interfaces';

interface IUseExercisesForWorkoutApi {
    exercises: ExerciseForWorkout[];
    isLoading: boolean;
    error: string;
}

export function useExercisesForWorkoutApi(): IUseExercisesForWorkoutApi {
    const [exercises, setExercises] = useState<ExerciseForWorkout[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        void getExercises();
    }, []);

    async function getExercises(): Promise<void> {
        setIsLoading(true);
        setError('');
        try {
            const response = await workoutsAPI.getExercisesForWorkouts();
            setExercises(response);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        exercises,
        isLoading,
        error,
    };
}
