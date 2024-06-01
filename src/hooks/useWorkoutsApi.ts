import { useEffect, useState } from 'react';
import { workoutsAPI } from 'src/api/workouts/workouts-api';
import { type Workout } from 'src/interfaces/workout';

interface IUseWorkouts {
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

    async function getWorkouts(): Promise<void> {
        setIsLoading(true);
        setError('');
        try {
            const workouts = await workoutsAPI.getWorkouts();
            setWorkouts(workouts);
        } catch (e) {
            setError(`Could not get workouts: ${e.message as string}`);
        } finally {
            setIsLoading(false);
        }
    }

    return { workouts, isLoading, error };
}
