import { useQuery } from '@tanstack/react-query';
import { type Workout } from '../../interfaces/Workout';
import { getWorkouts } from '../../services/api/WorkoutsAPI';

interface UseGetWorkouts {
    workouts: Workout[] | undefined;
    isLoading: boolean;
}

export default function useGetWorkouts(): UseGetWorkouts {
    const { data, isLoading, error, isError } = useQuery(['workouts'], getWorkouts);

    if (isError) {
        alert(error);
    }

    return { workouts: data, isLoading };
}
