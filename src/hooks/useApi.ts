import { useState } from 'react';
import { type Database } from '../interfaces/Database';
import { type Tables } from '../interfaces/Tables';
import { type InsertWorkoutRequest } from '../interfaces/Workout';

// types for supabase
type TableNames = keyof Database['public']['Tables'];
type DbInsert = Database['public']['Tables'][TableNames]['Insert'];
type TableFieldTypes = Tables<TableNames>;

type Payload = DbInsert | DbInsert[] | InsertWorkoutRequest;

interface UseApiReturn {
    execute: (payload: Payload) => Promise<void>;
    data: TableFieldTypes[] | null;
    isLoading: boolean;
    error: string;
}

export default function useApi(
    apiCall: (payload: Payload) => Promise<TableFieldTypes[]>
): UseApiReturn {
    const [data, setData] = useState<TableFieldTypes[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function execute(payload: Payload): Promise<void> {
        try {
            setError('');
            setIsLoading(true);
            const data = await apiCall(payload);
            setData(data);
        } catch (error) {
            setError(error.message);
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
