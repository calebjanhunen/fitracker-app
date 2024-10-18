import { request } from '../client';
import { IUpdateWeeklyWorkoutGoalRequest } from './interfaces/IUpdateWeeklyWorkoutGoalRequest';
import { IUserResponse } from './interfaces/IUserResponse';
import { IUserStatsResponse } from './interfaces/IUserStatsResponse';
import { userEndpoints } from './UserApiConfig';

export async function getUserById(): Promise<IUserResponse> {
    return await request({
        method: 'GET',
        url: userEndpoints.getUserById(),
    });
}

export async function updateWeeklyWorkoutGoal(
    data: IUpdateWeeklyWorkoutGoalRequest
): Promise<IUserStatsResponse> {
    return await request({
        method: 'PATCH',
        url: userEndpoints.updateWeeklyWorkoutGoal(),
        data,
    });
}
