import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { IErrorResponse } from 'src/api/client';
import { IUpdateWeeklyWorkoutGoalRequest } from 'src/api/user-service/interfaces/IUpdateWeeklyWorkoutGoalRequest';
import { IUserStatsResponse } from 'src/api/user-service/interfaces/IUserStatsResponse';
import * as UserApi from 'src/api/user-service/UserApiService';
import { updateWeeklyWorkoutGoal } from 'src/redux/user/UserSlice';

interface IUseUpdateWeeklyWorkoutGoal {
    updateGoal: (request: IUpdateWeeklyWorkoutGoalRequest) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useUpdateWeeklyWorkoutGoal(
    onSuccessCallback: () => void,
    onErrorCallback: (e: IErrorResponse) => void
): IUseUpdateWeeklyWorkoutGoal {
    const dispatch = useDispatch();

    const { mutate, isPending, error } = useMutation<
        IUserStatsResponse,
        IErrorResponse,
        IUpdateWeeklyWorkoutGoalRequest
    >({
        mutationFn: UserApi.updateWeeklyWorkoutGoal,
        onSuccess: async (response) => {
            dispatch(updateWeeklyWorkoutGoal(response.weeklyWorkoutGoal));
            onSuccessCallback();
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    return { updateGoal: mutate, isPending, error };
}
