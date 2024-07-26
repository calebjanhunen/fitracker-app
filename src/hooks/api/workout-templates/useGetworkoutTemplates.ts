import { useQuery } from '@tanstack/react-query';
import { workoutTemplatesApi } from 'src/api/workout-templates/workout-templates-api';
import type { WorkoutTemplate } from 'src/interfaces';

interface IUseGetWorkouts {
    workoutTemplates: WorkoutTemplate[] | undefined;
    isLoading: boolean;
    error: string | undefined;
}

export const WORKOUT_TEMPLATES_QUERY_KEY = ['workout-templates'];

export function useGetWorkoutTemplates(): IUseGetWorkouts {
    const {
        isLoading,
        error,
        data: workoutTemplates,
    } = useQuery<WorkoutTemplate[], Error>({
        queryKey: WORKOUT_TEMPLATES_QUERY_KEY,
        queryFn: workoutTemplatesApi.getWorkoutTemplates,
    });

    return { isLoading, error: error?.message, workoutTemplates };
}
