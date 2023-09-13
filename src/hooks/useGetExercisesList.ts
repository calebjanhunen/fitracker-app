import { useQuery } from '@tanstack/react-query';
import { type Tables } from '../interfaces/Tables';
import { ExercisesAPI } from '../services/api/ExercisesAPI';

interface ReturnType {
    exercises: Array<Tables<'exercises'>>;
    isLoading: boolean;
    isError: boolean;
}

const QUERY_KEY = ['exercises'];

// Gets list of readonly exercises
export default function useGetExercisesList(): ReturnType {
    const { getExercises } = ExercisesAPI;
    const { data, isLoading, error, isError } = useQuery(QUERY_KEY, getExercises);

    if (isError) {
        alert(error);
    }

    return { exercises: data ?? [], isLoading, isError };
}
