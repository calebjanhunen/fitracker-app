import { type User } from '@supabase/supabase-js';
import { useContext, useState } from 'react';
import { type Database } from '../interfaces/Database';
import { type Tables } from '../interfaces/Tables';
import { AuthContext } from '../services/context/AuthContext';

// types for supabase
type TableNames = keyof Database['public']['Tables'];
type TableFieldTypes = Tables<TableNames>;

interface UseApiReturn<T, P> {
    execute: (payload?: P) => Promise<void>;
    data: T | null;
    isLoading: boolean;
    error: string;
}

type ApiFunction<T, P> = (user: User | undefined, payload?: P) => Promise<T>;

export default function useApi<T, P>(apiFunction: ApiFunction<T, P>): UseApiReturn<T, P> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const { session } = useContext(AuthContext);

    async function execute(payload?: P): Promise<void> {
        if (!session?.user) {
            setError('Not authenticated');
            return;
        }
        try {
            setError('');
            setIsLoading(true);

            let response;
            if (payload) {
                response = await apiFunction(session.user, payload);
            } else {
                response = await apiFunction(session.user);
            }
            setData(response);
        } catch (error) {
            const errorMessage: string = error.message;
            setError(error.message);
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        execute,
        data,
        isLoading,
        error,
    };
}
