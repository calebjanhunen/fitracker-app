import React from 'react';
import { Hexagon } from 'src/components/common';
import { SizableText, useTheme, View, XStack } from 'tamagui';

interface Props {
    rank: number;
    xpVal: number;
}

export default function TotalXpDisplay({ rank, xpVal }: Props) {
    const theme = useTheme();
    const xpTextBackgroundColor =
        rank === 1
            ? theme.yellow8.val
            : rank === 2
            ? theme.gray11Dark.val
            : rank === 3
            ? '#a46628'
            : theme.blue10Dark.val;

    return (
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
                    {xpVal}
                </SizableText>
            </View>
        </XStack>
    );
}
