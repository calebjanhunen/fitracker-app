import { useState } from 'react';
import { exercisesAPI } from 'src/api/exercises/exercises-api';
import { type Exercise, type PaginationResponse } from 'src/interfaces';

interface IUseExercisesApi {
    exercises: Exercise[];
    isLoading: boolean;
    error: string;
    hasMore: boolean;
    getExercises: (limit: number) => Promise<void>;
}

export function useExercisesApi(): IUseExercisesApi {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    async function getExercises(limit: number): Promise<void> {
        setIsLoading(true);
        setError('');
        try {
            const response: PaginationResponse<Exercise> = await exercisesAPI.getExercises(
                page,
                limit
            );
            // console.log('response: ', response.resources);
            setHasMore(response.hasMore);
            setPage((prev) => prev + 1);
            setExercises((prev) => [...prev, ...response.resources]);
        } catch (e) {
            setError(`Could not get exercises: ${e.message as string}`);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        exercises,
        isLoading,
        error,
        getExercises,
        hasMore,
    };
}
