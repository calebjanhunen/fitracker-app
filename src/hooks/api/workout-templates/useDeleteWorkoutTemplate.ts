import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { queryClient } from 'src/api/config/react-query.config';
import { workoutTemplatesApi } from 'src/api/workout-templates/workout-templates-api';
import { WORKOUT_TEMPLATES_QUERY_KEY } from './useGetworkoutTemplates';

interface IUseDeleteWorkout {
    deleteWorkoutTemplate: (workoutId: string) => void;
    isLoading: boolean;
}

export function useDeleteWorkoutTemplate(): IUseDeleteWorkout {
    const { mutate: deleteWorkoutTemplate, isPending: isLoading } = useMutation({
        mutationFn: workoutTemplatesApi.deleteWorkoutTemplate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: WORKOUT_TEMPLATES_QUERY_KEY });
        },
        onError: (e) => {
            Alert.alert('Could not delete workout template.', e.message);
        },
    });

    return {
        isLoading,
        deleteWorkoutTemplate,
    };
}
