import React, { useState } from 'react';

import ContentLoader, { Rect } from 'react-content-loader/native';
import { FlatList } from 'react-native';
import { IErrorResponse } from 'src/api/client';
import { TotalXpLeaderboardUserDto } from 'src/api/generated';
import { SizableText, useTheme, View } from 'tamagui';
import UserLeaderboardCard from './UserLeaderboardCard';

interface Props {
    data: TotalXpLeaderboardUserDto[] | undefined;
    isLoading: boolean;
    error: IErrorResponse | null;
    updateData: () => void;
}

export default function TotalXpLeaderboardList({ data, isLoading, error, updateData }: Props) {
    const theme = useTheme();
    const [isRefreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            updateData();
            setRefreshing(false);
        }, 1500);
    };

    if (isLoading) {
        return (
            <View flex={1}>
                <ContentLoader
                    width='100%'
                    height='100%'
                    foregroundColor={theme.gray6.val}
                    backgroundColor={theme.gray3.val}
                >
                    {Array.from({ length: 7 }).map((_, index) => (
                        <Rect
                            key={index}
                            y={0 + index * (70 + 20)}
                            rx='20'
                            ry='20'
                            width='100%'
                            height='70'
                        />
                    ))}
                </ContentLoader>
            </View>
        );
    }

    if (error) {
        return (
            <View flex={1} paddingTop='$space.3'>
                <SizableText textAlign='center' color='$red10' fontWeight='bold'>
                    An unexpected error occured while getting the leaderboard. Please try again
                    later.
                </SizableText>
            </View>
        );
    }

    if (data?.length) {
        return (
            <FlatList
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: theme.backgroundStrong.val }}
                data={data}
                renderItem={({ item, index }) => (
                    <UserLeaderboardCard rank={index + 1} user={item} />
                )}
                ItemSeparatorComponent={() => (
                    <View height='$space.4' backgroundColor='$background' />
                )}
            />
        );
    }

    return <SizableText>No users. Dead app.</SizableText>;
}
