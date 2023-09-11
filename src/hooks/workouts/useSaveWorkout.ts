import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Exercise } from '../../interfaces/Exercise';
import { saveWorkout } from '../../services/api/WorkoutsAPI';
import { AuthContext } from '../../services/context/AuthContext';

interface UseSaveWorkout {
    initSaveWorkout: (payload: {
        workoutName: string;
        workoutExercises: Exercise[];
    }) => Promise<void>;
    isLoading: boolean;
    isError: boolean;
}

export default function useSaveWorkout(): UseSaveWorkout {
    const queryClient = useQueryClient();
    const { session } = useContext(AuthContext);

    const { mutateAsync, isLoading, isError } = useMutation({
        mutationFn: callSaveWorkout,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['workouts']);
        },
        onError: (error) => {
            alert(error);
        },
    });

    async function callSaveWorkout(payload: {
        workoutName: string;
        workoutExercises: Exercise[];
    }): Promise<void> {
        const { workoutName, workoutExercises } = payload;
        await saveWorkout(session?.user, workoutName, workoutExercises);
    }

    return { initSaveWorkout: mutateAsync, isLoading, isError };
}
