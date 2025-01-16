import React from 'react';
import { TotalXpLeaderboardUserDto } from 'src/api/generated';
import { getOrdinalSuffix } from 'src/utils';
import { Card, FontSizeTokens, SizableText, useTheme, XStack } from 'tamagui';
import TotalXpDisplay from './TotalXpDisplay';
import UserInfo from './UserInfo';

interface Props {
    user: TotalXpLeaderboardUserDto;
    rank: number;
}

export default function UserLeaderboardCard({ rank, user }: Props) {
    const theme = useTheme();
    const backgroundColor =
        rank === 1
            ? theme.yellow9.val
            : rank === 2
            ? theme.gray8.val
            : rank === 3
            ? '#CD7F32'
            : theme.blue10.val;

    const rankFontSize: FontSizeTokens = rank < 10 ? '$4' : rank >= 10 && rank < 100 ? '$3' : '$1';

    return (
        <Card
            paddingHorizontal='$space.3'
            paddingVertical='$space.3'
            backgroundColor={backgroundColor}
            borderRadius={20}
        >
            <XStack alignItems='center'>
                <XStack alignItems='center' gap='$space.1.5' flex={1}>
                    <SizableText
                        textAlign='center'
                        color='$gray1'
                        size={rankFontSize}
                        fontWeight='bold'
                        width='15%'
                    >
                        {rank}
                        {getOrdinalSuffix(rank)}
                    </SizableText>
                    <UserInfo username={user.username} />
                </XStack>
                <TotalXpDisplay rank={rank} xpVal={user.totalXp} />
            </XStack>
        </Card>
    );
}
