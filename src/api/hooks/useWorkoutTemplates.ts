import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { WorkoutTemplatesApi } from '../generated';

export const WorkoutTemplateQueryKeys = {
    getAllWorkoutTemplates: ['workoutTemplates'],
};

const workoutTemplatesApi = new WorkoutTemplatesApi(undefined, undefined, apiClient);

export function useGetAllWorkoutTemplates() {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            const response = await workoutTemplatesApi.getAllWorkoutTemplates();
            return response.data;
        },
        queryKey: WorkoutTemplateQueryKeys.getAllWorkoutTemplates,
    });

    return { data: data ?? [], isLoading, error };
}
