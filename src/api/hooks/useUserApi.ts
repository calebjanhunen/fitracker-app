import { useMutation } from '@tanstack/react-query';
import { IErrorResponse } from '../client';
import { UserProfileDto } from '../generated';
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
