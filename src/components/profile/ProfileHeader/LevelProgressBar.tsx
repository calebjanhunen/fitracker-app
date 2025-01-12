import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';

import * as Progress from 'react-native-progress';
import { SizableText, useTheme, YStack } from 'tamagui';

interface Props {
    currentXp: number;
    xpNeededForCurrentLevel: number;
}

export default function LevelProgressBar({ currentXp, xpNeededForCurrentLevel }: Props) {
    const theme = useTheme();
    const [progress, setProgress] = useState(0);

    // set progress on screen focus to animate the progress bar
    useFocusEffect(
        useCallback(() => {
            setProgress(currentXp / xpNeededForCurrentLevel);

            return () => {
                setProgress(0);
            };
        }, [currentXp, xpNeededForCurrentLevel])
    );

    return (
        <YStack>
            <SizableText size='$2' color='$gray10'>
                {currentXp} / {xpNeededForCurrentLevel}
            </SizableText>
            <Progress.Bar
                borderRadius={10}
                borderColor='transparent'
                progress={progress}
                height={13}
                width={null}
                unfilledColor={theme.gray6.val}
                color={theme.blue10.val}
            />
        </YStack>
    );
}
