import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { queryClient } from 'src/api/config/react-query.config';
import type { ICreateWorkoutTemplate } from 'src/interfaces';
import { WORKOUT_TEMPLATES_QUERY_KEY } from './useGetworkoutTemplates';
import { workoutTemplatesApi } from 'src/api/workout-templates/workout-templates-api';

interface IUseCreateWorkout {
    isSaving: boolean;
    createWorkoutTemplate: (workoutTemplate: ICreateWorkoutTemplate) => void;
}

export function useCreateWorkoutTemplate(): IUseCreateWorkout {
    const navigation = useNavigation();

    const { mutate: createWorkoutTemplate, isPending: isSaving } = useMutation({
        mutationFn: workoutTemplatesApi.saveWorkoutTemplate,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: WORKOUT_TEMPLATES_QUERY_KEY });
            navigation.goBack();
        },
        onError: (e) => {
            Alert.alert('Error saving workout template: ', e.message);
        },
    });

    return { isSaving, createWorkoutTemplate };
}
