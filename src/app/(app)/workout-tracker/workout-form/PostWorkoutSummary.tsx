import Constants from 'expo-constants';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import * as Progress2 from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgressBar } from 'src/hooks/workout-tracker/useProgressBar';
import {
    Button,
    Circle,
    H1,
    H2,
    H3,
    H4,
    H6,
    Progress,
    Separator,
    SizableText,
    useTheme,
    View,
    XStack,
    YStack,
} from 'tamagui';

export default function PostWorkoutSummary() {
    const {
        currentXpBeforeWorkout,
        levelBeforeWorkout,
        workoutEffortXp,
        workoutGoalXp,
        workoutGoalStreakXp,
    } = useLocalSearchParams<{
        currentXpBeforeWorkout: string;
        levelBeforeWorkout: string;
        workoutEffortXp: string;
        workoutGoalXp: string;
        workoutGoalStreakXp: string;
    }>();
    const theme = useTheme();
    const { level, progress, isAnimated, duration, currentXpSourceName, currentXpSourceVal } =
        useProgressBar(Number(levelBeforeWorkout), Number(currentXpBeforeWorkout), {
            workoutEffortXp,
            workoutGoalXp,
            workoutGoalStreakXp,
        });

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 30,
            }}
        >
            <View paddingTop='$space.5' flex={1}>
                <H3 paddingBottom='$space.3' textAlign='center'>
                    Workout Completed!
                </H3>

                <XStack alignItems='center'>
                    <Circle
                        size={50}
                        backgroundColor={theme.blue10.val}
                        marginRight={-20}
                        zIndex={1}
                        borderColor='$gray12'
                        borderWidth={2}
                    >
                        <SizableText size='$7' fontWeight='bold' color='$gray1'>
                            {level}
                        </SizableText>
                    </Circle>
                    <Progress2.Bar
                        width={350}
                        height={20}
                        borderRadius={20}
                        progress={progress}
                        animated={isAnimated}
                        animationType='timing'
                        animationConfig={{ duration, easing: Easing.inOut(Easing.ease) }}
                        color={theme.blue10.val}
                        unfilledColor={theme.gray8.val}
                        borderColor='transparent'
                    />
                </XStack>
                {currentXpSourceName && (
                    <SizableText size='$5' paddingTop='$space.2'>
                        {currentXpSourceName}: {currentXpSourceVal} XP
                    </SizableText>
                )}
            </View>
            <Link href='workout-tracker' asChild>
                <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold'>
                    Return to Home
                </Button>
            </Link>
        </SafeAreaView>
    );
}
