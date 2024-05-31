import { useCallback, useEffect, useState } from 'react';
import { exercisesAPI } from 'src/api/exercises/exercises-api';
import { type Exercise, type PaginationResponse } from 'src/interfaces';

interface IUseExercisesApi {
    exercises: Exercise[];
    isLoading: boolean;
    error: string;
    hasMore: boolean;
    getMore: () => Promise<void>;
}

export function useExercisesApi(limit: number): IUseExercisesApi {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        void getExercises();
    }, []);

    const getExercises = useCallback(async (): Promise<void> => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setError('');
        try {
            const response: PaginationResponse<Exercise> = await exercisesAPI.getExercises(
                page,
                limit
            );
            setHasMore(response.hasMore);
            setPage((prev) => prev + 1);
            setExercises((prev) => [...prev, ...response.resources]);
        } catch (e) {
            console.log('error: ', e);
            setError(`Could not get exercises: ${e.message as string}`);
        } finally {
            setIsLoading(false);
        }
    }, [hasMore, isLoading, page]);

    return {
        exercises,
        isLoading,
        error,
        getMore: getExercises,
        hasMore,
    };
}
