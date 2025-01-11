import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Easing } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AnimatedIncreasingNumber } from 'src/components/workout-tracker/post-workout-summary/AnimatedIncreasingNumber';
import { useProgressBar } from 'src/hooks/workout-tracker/useProgressBar';
import { RootState } from 'src/redux/Store';
import { getOrdinalSuffix } from 'src/utils';
import { Button, Circle, H3, SizableText, useTheme, View, XStack, YStack } from 'tamagui';

interface WorkoutStats extends Record<string, string> {
    currentXpBeforeWorkout: string;
    levelBeforeWorkout: string;
    workoutEffortXp: string;
    workoutGoalXp: string;
    workoutGoalStreakXp: string;
    daysWithWorkoutThisWeek: string;
}

export default function PostWorkoutSummary() {
    const user = useSelector((state: RootState) => state.user);
    const {
        currentXpBeforeWorkout,
        levelBeforeWorkout,
        workoutEffortXp,
        workoutGoalXp,
        workoutGoalStreakXp,
        daysWithWorkoutThisWeek,
    } = useLocalSearchParams<WorkoutStats>();
    const daysUntilWeeklyGoal = user.weeklyWorkoutGoal - Number(daysWithWorkoutThisWeek);
    const theme = useTheme();
    const {
        level,
        progress,
        isAnimated,
        duration,
        totalXp,
        displayWeeklyStreak,
        displayWorkoutEffort,
        displayWorkoutGoal,
    } = useProgressBar(Number(levelBeforeWorkout), Number(currentXpBeforeWorkout), {
        workoutEffortXp,
        workoutGoalXp,
        workoutGoalStreakXp,
    });

    function getGoalMessage() {
        const ordinalSuffix = getOrdinalSuffix(Number(daysWithWorkoutThisWeek));
        return daysUntilWeeklyGoal > 0 ? (
            <SizableText textAlign='center'>
                This is your {daysWithWorkoutThisWeek}
                {ordinalSuffix} of the week. Only {daysUntilWeeklyGoal} more workout
                {daysUntilWeeklyGoal === 1 ? '' : 's'} until you hit your weekly goal!
            </SizableText>
        ) : (
            <SizableText textAlign='center'>
                You hit your weekly goal of {user.weeklyWorkoutGoal} workouts per week! Well done!
            </SizableText>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingHorizontal: 16,
            }}
        >
            <View paddingTop='$space.5' flex={1}>
                <H3 paddingBottom='$space.3' textAlign='center'>
                    Workout Completed!
                </H3>
                <View>{getGoalMessage()}</View>

                <XStack alignItems='center' paddingTop='$space.3'>
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
                    <Progress.Bar
                        width={325}
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
                <YStack alignItems='center' paddingTop='$space.2' gap='$space.3'>
                    <XStack alignItems='flex-end' gap='$space.2'>
                        <AnimatedIncreasingNumber numberToAnimate={totalXp} />
                        <SizableText size='$7'>XP</SizableText>
                    </XStack>
                    <YStack>
                        {displayWorkoutEffort && (
                            <SizableText size='$5'>Workout Effort + {workoutEffortXp}</SizableText>
                        )}
                        {displayWorkoutGoal && (
                            <SizableText size='$5'>Workout Goal + {workoutGoalXp} </SizableText>
                        )}
                        {displayWeeklyStreak && (
                            <SizableText size='$5'>
                                Weekly Streak + {workoutGoalStreakXp}{' '}
                            </SizableText>
                        )}
                    </YStack>
                </YStack>
            </View>
            <Link href='workout-tracker' asChild>
                <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold'>
                    Return to Home
                </Button>
            </Link>
        </SafeAreaView>
    );
}
