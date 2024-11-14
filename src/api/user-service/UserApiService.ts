import { request } from '../client';
import { IUpdateWeeklyWorkoutGoalRequest } from './interfaces/IUpdateWeeklyWorkoutGoalRequest';
import { IUserStatsResponse } from './interfaces/IUserStatsResponse';
import { userEndpoints } from './UserApiConfig';

export async function updateWeeklyWorkoutGoal(
    data: IUpdateWeeklyWorkoutGoalRequest
): Promise<IUserStatsResponse> {
    return await request({
        method: 'PATCH',
        url: userEndpoints.updateWeeklyWorkoutGoal(),
        data,
    });
}
