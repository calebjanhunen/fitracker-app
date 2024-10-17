import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { IErrorResponse } from 'src/api/client';
import { IUpdateWeeklyWorkoutGoalRequest } from 'src/api/user-service/interfaces/IUpdateWeeklyWorkoutGoalRequest';
import { IUserStatsResponse } from 'src/api/user-service/interfaces/IUserStatsResponse';
import * as UserApi from 'src/api/user-service/UserApiService';
import { updateWeeklyWorkoutGoal } from 'src/redux/user/UserSlice';
import { useLocalStorage } from '../common/useLocalStorage';

interface IUseUpdateWeeklyWorkoutGoal {
    updateGoal: (request: IUpdateWeeklyWorkoutGoalRequest) => void;
    isPending: boolean;
    error: IErrorResponse | null;
}

export function useUpdateWeeklyWorkoutGoal(
    onSuccessCallback: () => void,
    onErrorCallback: (e: IErrorResponse) => void
): IUseUpdateWeeklyWorkoutGoal {
    const { saveToStorage } = useLocalStorage();
    const dispatch = useDispatch();

    const { mutate, isPending, error } = useMutation<
        IUserStatsResponse,
        IErrorResponse,
        IUpdateWeeklyWorkoutGoalRequest
    >({
        mutationFn: UserApi.updateWeeklyWorkoutGoal,
        onSuccess: async (response) => {
            dispatch(updateWeeklyWorkoutGoal(response.weeklyWorkoutGoal));
            await saveToStorage('weekly-workout-goal', response.weeklyWorkoutGoal.toString());
        },
        onError: (e) => {
            onErrorCallback(e);
        },
    });

    return { updateGoal: mutate, isPending, error };
}
