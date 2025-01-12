import React from 'react';

import * as Progress from 'react-native-progress';
import { SizableText, useTheme, YStack } from 'tamagui';

interface Props {
    currentXp: number;
    xpNeededForCurrentLevel: number;
}

export default function LevelProgressBar({ currentXp, xpNeededForCurrentLevel }: Props) {
    const theme = useTheme();

    return (
        <YStack>
            <SizableText size='$2' color='$gray10'>
                {currentXp} / {xpNeededForCurrentLevel}
            </SizableText>
            <Progress.Bar
                borderRadius={10}
                borderColor='transparent'
                progress={0.3}
                height={13}
                width={null}
                unfilledColor={theme.gray6.val}
                color={theme.blue10.val}
            />
        </YStack>
    );
}
