import React, { useEffect } from 'react';
import AnimateableText from 'react-native-animateable-text';
import {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'tamagui';

interface Props {
    numberToAnimate: number;
}

export function AnimatedIncreasingNumber({ numberToAnimate }: Props) {
    const theme = useTheme();

    const animatedNumber = useSharedValue(0);

    const animatedNumberText = useDerivedValue(() => {
        return `${animatedNumber.value.toFixed(0)}`;
    });

    const animatedProps = useAnimatedProps(() => ({
        text: animatedNumberText.value,
    }));

    useEffect(() => {
        animatedNumber.value = withTiming(numberToAnimate, { duration: 900 });
    }, [numberToAnimate]);

    return (
        <AnimateableText
            animatedProps={animatedProps}
            style={{
                color: theme.gray12.val,
                fontSize: 40,
                fontWeight: 'bold',
                fontFamily: 'Inter',
            }}
        />
    );
}
