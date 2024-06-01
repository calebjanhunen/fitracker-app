import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { workoutsAPI } from 'src/api/workouts/workouts-api';
import type { Workout, WorkoutForm } from 'src/interfaces';
import { sanitizeWorkout } from 'src/utils/workout-form-utils';

interface IUseWorkouts {
    saveWorkout: (workout: WorkoutForm) => Promise<boolean>;
    workouts: Workout[];
    isLoading: boolean;
    error: string;
}

export function useWorkoutsApi(): IUseWorkouts {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        void getWorkouts();
    }, []);

    const getWorkouts = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError('');
        try {
            const workouts = await workoutsAPI.getWorkouts();
            console.log('GETTING WORKOUTS', workouts.length);
            setWorkouts([...workouts]);
        } catch (e) {
            setError(`Could not get workouts: ${e.message as string}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveWorkout = useCallback(async (workout: WorkoutForm): Promise<boolean> => {
        setIsLoading(true);
        const sanitizedWorkout = sanitizeWorkout(workout);
        try {
            await workoutsAPI.saveWorkout(sanitizedWorkout);
            await getWorkouts();

            return true;
        } catch (e) {
            Alert.alert('Error saving workout', e.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { workouts, isLoading, error, saveWorkout };
}
