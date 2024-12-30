import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/user/UserSlice';
import { IErrorResponse } from '../client';
import { UserProfileDto } from '../generated';
import { UserApiQueryKeys } from '../QueryKeys';
import { userApiService } from '../services';

export function useUpdateWeeklyWorkoutGoal(
    onSuccessCallback: (response: UserProfileDto) => void,
    onErrorCallback: (e: IErrorResponse) => void
) {
    const {
        mutate: updateWeeklyGoal,
        isPending,
        error,
    } = useMutation({
        mutationFn: userApiService.updateWeeklyWorkoutGoal,
        onSuccess: onSuccessCallback,
        onError: onErrorCallback,
    });

    return { updateWeeklyGoal, isPending, error };
}

export function useGetCurrentUser() {
    const dispatch = useDispatch();
    const { data, isLoading, error, refetch } = useQuery({
        queryFn: userApiService.getCurrentUser,
        queryKey: UserApiQueryKeys.getCurrentUser,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [data]);

    return { data, isLoading, error, refetch };
}
