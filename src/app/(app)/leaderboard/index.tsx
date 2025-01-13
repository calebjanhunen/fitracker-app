import React from 'react';
import { FlatList } from 'react-native';
import { UserLeaderboardCard } from 'src/components/leaderboard';
import { H4, useTheme, View } from 'tamagui';

export default function Leaderboard() {
    const theme = useTheme();

    return (
        <View flex={1}>
            <H4 color='$blue10'>Total XP</H4>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: theme.backgroundStrong.val }}
                data={[0, 0, 0, 0, 0, 0, 0, 0]}
                renderItem={({ item, index }) => <UserLeaderboardCard rank={index + 1} />}
                ItemSeparatorComponent={() => (
                    <View height='$space.4' backgroundColor='$background' />
                )}
            />
        </View>
    );
}
