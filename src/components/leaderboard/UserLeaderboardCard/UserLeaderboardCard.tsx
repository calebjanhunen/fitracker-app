import React from 'react';
import { Card, SizableText, useTheme, XStack } from 'tamagui';
import TotalXpDisplay from './TotalXpDisplay';
import UserInfo from './UserInfo';

interface Props {
    rank: number;
}

export default function UserLeaderboardCard({ rank }: Props) {
    const theme = useTheme();
    const backgroundColor =
        rank === 1
            ? theme.yellow9.val
            : rank === 2
            ? theme.gray8.val
            : rank === 3
            ? '#CD7F32'
            : theme.blue10.val;

    return (
        <Card
            elevate
            paddingHorizontal='$space.3'
            paddingVertical='$space.3'
            backgroundColor={backgroundColor}
            borderRadius={20}
        >
            <XStack alignItems='center' justifyContent='space-between'>
                <XStack alignItems='center' gap='$space.5'>
                    <SizableText color='$gray1' size='$9' fontWeight='bold'>
                        {rank}
                    </SizableText>
                    <UserInfo username='calebjahunen' />
                </XStack>
                <TotalXpDisplay rank={rank} xpVal={231} />
            </XStack>
        </Card>
    );
}
