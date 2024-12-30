import { apiClient } from '../client';
import { UpdateWeeklyWorkoutGoalDto, UserProfileDto, UsersApi } from '../generated';

const userApi = new UsersApi(undefined, undefined, apiClient);

export const userApiService = {
    async updateWeeklyWorkoutGoal(request: UpdateWeeklyWorkoutGoalDto): Promise<UserProfileDto> {
        const response = await userApi.updateWeeklyWorkoutGoal(request);
        return response.data;
    },
    async getCurrentUser(): Promise<UserProfileDto> {
        const response = await userApi.getCurrentUser();
        return response.data;
    },
};
