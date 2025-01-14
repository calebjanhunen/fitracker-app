import { apiClient } from '../client';
import { LeaderboardApi, TotalXpLeaderboardUserDto } from '../generated';

const leaderboardApi = new LeaderboardApi(undefined, undefined, apiClient);

export const leaderboardApiService = {
    async getTotalXpLeaderboard(): Promise<TotalXpLeaderboardUserDto[]> {
        // Fake timeout to display sekeleton
        await new Promise((resolve) => setTimeout(resolve, 700));
        const response = await leaderboardApi.getTotalXpLeaderboard();
        return response.data;
    },
};
