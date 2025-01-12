import React from 'react';
import { Hexagon, UserAvatar } from 'src/components/common';
import { Card, SizableText, useTheme, View, XStack } from 'tamagui';

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
    const xpTextBackgroundColor =
        rank === 1
            ? theme.yellow8.val
            : rank === 2
            ? theme.gray11Dark.val
            : rank === 3
            ? '#a46628'
            : theme.blue10Dark.val;
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
                    <XStack alignItems='center' gap='$space.2'>
                        <UserAvatar size={40} />
                        <SizableText size='$6' fontWeight='bold' color='$gray1'>
                            calebjanhunen
                        </SizableText>
                    </XStack>
                </XStack>
                <XStack alignItems='center'>
                    <Hexagon size={30} text='XP' fontSize={12} />
                    <View
                        zIndex={-1}
                        marginLeft={-20}
                        backgroundColor={xpTextBackgroundColor}
                        borderTopRightRadius={20}
                        borderBottomRightRadius={20}
                    >
                        <SizableText
                            paddingHorizontal='$space.3'
                            paddingVertical='$space.2'
                            paddingLeft='$space.5'
                            fontWeight='bold'
                            color='$gray1'
                        >
                            329
                        </SizableText>
                    </View>
                </XStack>
            </XStack>
        </Card>
    );
}
