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
                data={userData}
                renderItem={({ item, index }) => (
                    <UserLeaderboardCard rank={index + 1} user={item} />
                )}
                ItemSeparatorComponent={() => (
                    <View height='$space.4' backgroundColor='$background' />
                )}
            />
        </View>
    );
}

export interface UserLeaderboardData {
    username: string;
    xp: number;
}
const userData: UserLeaderboardData[] = [
    { username: 'calebj', xp: 999999 },
    { username: 'calebj', xp: 124555 },
    { username: 'calebj', xp: 999999999 },
    { username: 'calebj', xp: 999999999999 },
    { username: 'calebj', xp: 999 },
    // { username: 'alice', xp: 234 },
    // { username: 'bob', xp: 12512 },
    // { username: 'mark', xp: 123123121 },
    // { username: 'lizzy', xp: 999999 },
    // { username: 'test21', xp: 1212312331 },
    // { username: 'test2', xp: 12312411 },
];
