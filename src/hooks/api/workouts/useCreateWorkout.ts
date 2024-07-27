import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { queryClient } from 'src/api/config/react-query.config';
import { workoutsAPI } from 'src/api/workouts/workouts-api';
import { useWorkoutForm } from 'src/hooks/useWorkoutForm';
import { useWorkoutInProgress } from 'src/hooks/useWorkoutInProgress';
import type { WorkoutForm } from 'src/interfaces';
import { EXERCISES_FOR_WORKOUT_QUERY_KEY } from '../exercises/useGetExercisesForWorkout';
import { WORKOUT_TEMPLATES_QUERY_KEY } from '../workout-templates/useGetworkoutTemplates';
import { WORKOUTS_QUERY_KEY } from './useGetWorkouts';

interface IUseCreateWorkout {
    isSaving: boolean;
    createWorkout: (workout: WorkoutForm) => void;
}

export function useCreateWorkout(): IUseCreateWorkout {
    const { setWorkoutInProgress } = useWorkoutInProgress();
    const { clearWorkout } = useWorkoutForm();
    const navigation = useNavigation();

    const { mutate: createWorkout, isPending: isSaving } = useMutation({
        mutationFn: workoutsAPI.saveWorkout,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY });
            await queryClient.invalidateQueries({ queryKey: EXERCISES_FOR_WORKOUT_QUERY_KEY });
            await queryClient.invalidateQueries({ queryKey: WORKOUT_TEMPLATES_QUERY_KEY });
            setWorkoutInProgress(false);
            clearWorkout();
            navigation.goBack();
        },
        onError: (e) => {
            Alert.alert('Error saving workout: ', e.message);
        },
    });

    return { isSaving, createWorkout };
}
