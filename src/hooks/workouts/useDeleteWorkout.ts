import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWorkout } from '../../services/api/WorkoutsAPI';
import { AuthContext } from '../../services/context/AuthContext';

interface DeleteWorkout {
    initDeleteWorkout: (workoutId: number) => Promise<void>;
    isLoading: boolean;
    isError: boolean;
}

export default function useDeleteWorkout(): DeleteWorkout {
    const queryClient = useQueryClient();
    const { session } = useContext(AuthContext);

    const { mutateAsync, isLoading, isError } = useMutation({
        mutationFn: callDeleteWorkout,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['workouts']);
        },
        onError: (error) => {
            alert(error);
        },
    });

    async function callDeleteWorkout(workoutId: number): Promise<void> {
        await deleteWorkout(session?.user, workoutId);
    }

    return { initDeleteWorkout: mutateAsync, isLoading, isError };
}
