import { useContext } from 'react';

import { type User } from '@supabase/supabase-js';
import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { AuthContext } from '../services/context/AuthContext';

interface Props<TArgs> {
    mutationFn: (user: User | undefined, payload: TArgs) => Promise<void>;
    queryKey: QueryKey;
}

interface ReturnType<TArgs> {
    initMutate: (payload: TArgs) => Promise<void>;
    isLoading: boolean;
    isError: boolean;
}

export default function useCustomMutation<TArgs>({
    mutationFn,
    queryKey,
}: Props<TArgs>): ReturnType<TArgs> {
    const queryClient = useQueryClient();
    const { session } = useContext(AuthContext);

    const { mutateAsync, isLoading, isError } = useMutation({
        mutationFn: async (payload: TArgs) => {
            await mutationFn(session?.user, payload);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(queryKey);
        },
        onError: (error, variables, context) => {
            alert(error);
            console.log(variables, context);
        },
    });

    return { initMutate: mutateAsync, isLoading, isError };
}
