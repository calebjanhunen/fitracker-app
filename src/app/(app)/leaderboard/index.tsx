import React from 'react';
import { useGetTotalXpLeaderboard } from 'src/api/hooks';
import { TotalXpLeaderboardList } from 'src/components/leaderboard';
import { H4, View } from 'tamagui';

export default function Leaderboard() {
    const { data, isLoading, error } = useGetTotalXpLeaderboard();

    return (
        <View flex={1}>
            <H4 color='$blue10'>Total XP</H4>
            <TotalXpLeaderboardList data={data} isLoading={isLoading} error={error} />
        </View>
    );
}
