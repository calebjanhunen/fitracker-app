import { useQuery } from '@tanstack/react-query';
import { LeaderbaordApiQueryKeys } from '../QueryKeys';
import { leaderboardApiService } from '../services';

export function useGetTotalXpLeaderboard() {
    const { data, isLoading, error } = useQuery({
        queryFn: leaderboardApiService.getTotalXpLeaderboard,
        queryKey: LeaderbaordApiQueryKeys.getTotalXpLeaderbaord,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { data, isLoading, error };
}
