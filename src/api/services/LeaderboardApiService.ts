import { apiClient } from '../client';
import { LeaderboardApi, TotalXpLeaderboardUserDto } from '../generated';

const leaderboardApi = new LeaderboardApi(undefined, undefined, apiClient);

export const leaderboardApiService = {
    async getTotalXpLeaderboard(): Promise<TotalXpLeaderboardUserDto[]> {
        const response = await leaderboardApi.getTotalXpLeaderboard();
        return response.data;
    },
};
