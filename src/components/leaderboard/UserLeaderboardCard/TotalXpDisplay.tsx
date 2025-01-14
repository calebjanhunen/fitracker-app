import React from 'react';
import { Hexagon } from 'src/components/common';
import { FontSizeTokens, SizableText, useTheme, View, XStack } from 'tamagui';

interface Props {
    rank: number;
    xpVal: number;
    flex: number;
}

export default function TotalXpDisplay({ rank, xpVal, flex }: Props) {
    const theme = useTheme();
    const xpTextBackgroundColor =
        rank === 1
            ? theme.yellow8.val
            : rank === 2
            ? theme.gray11Dark.val
            : rank === 3
            ? '#a46628'
            : theme.blue10Dark.val;

    function formatXp(xp: number): string {
        if (xp >= 1000000000) {
            return (Math.floor((xp / 1000000000) * 100) / 100).toFixed(2) + 'B';
        }
        if (xp >= 1000000) {
            return (Math.floor((xp / 1000000) * 100) / 100).toFixed(2) + 'M';
        }
        if (xp >= 1000) {
            return (Math.floor((xp / 1000) * 100) / 100).toFixed(2) + 'K';
        }
        return xp.toString();
    }

    function getFontSize(xp: number): FontSizeTokens {
        const xpDisplay = formatXp(xp);
        if (xpDisplay.length >= 6) {
            return '$1';
        }
        if (xpDisplay.length === 5) {
            return '$2';
        }
        return '$3';
    }
    return (
        <XStack alignItems='center' flex={flex}>
            <Hexagon size={30} text='XP' fontSize={12} />
            <View
                zIndex={-1}
                marginLeft={-22}
                backgroundColor={xpTextBackgroundColor}
                borderTopRightRadius={20}
                borderBottomRightRadius={20}
                width='85%'
            >
                <SizableText
                    size={getFontSize(xpVal)}
                    paddingHorizontal='$space.2'
                    paddingVertical='$space.2'
                    paddingLeft='$space.5'
                    fontWeight='bold'
                    color='$gray1'
                    textAlign='center'
                >
                    {formatXp(xpVal)}
                </SizableText>
            </View>
        </XStack>
    );
}
