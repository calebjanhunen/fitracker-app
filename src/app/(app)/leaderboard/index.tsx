import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetTotalXpLeaderboard } from 'src/api/hooks';
import { TotalXpLeaderboardList } from 'src/components/leaderboard';
import { H4, useTheme } from 'tamagui';

export default function Leaderboard() {
    const theme = useTheme();
    const { data, isLoading, error, updateData } = useGetTotalXpLeaderboard();

    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.background.val }}
        >
            <H4 textAlign='center' color='$blue10' paddingBottom='$space.5'>
                Total XP Leaderboard
            </H4>
            <TotalXpLeaderboardList
                data={data}
                isLoading={isLoading}
                error={error}
                updateData={updateData}
            />
        </SafeAreaView>
    );
}
