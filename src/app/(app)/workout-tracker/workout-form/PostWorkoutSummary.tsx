import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Easing } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AnimatedIncreasingNumber } from 'src/components/workout-tracker/post-workout-summary/AnimatedIncreasingNumber';
import { useProgressBar } from 'src/hooks/workout-tracker/useProgressBar';
import { RootState } from 'src/redux/Store';
import { Button, Circle, H3, SizableText, useTheme, View, XStack, YStack } from 'tamagui';

interface WorkoutStats extends Record<string, string> {
    currentXpBeforeWorkout: string;
    levelBeforeWorkout: string;
    workoutEffortXp: string;
    workoutGoalXp: string;
    workoutGoalStreakXp: string;
    daysWithWorkoutsThisWeek: string;
    hasWorkoutGoalAlreadyBeenAchieved: string;
}

export default function PostWorkoutSummary() {
    const user = useSelector((state: RootState) => state.user);
    const {
        currentXpBeforeWorkout,
        levelBeforeWorkout,
        workoutEffortXp,
        workoutGoalXp,
        workoutGoalStreakXp,
        daysWithWorkoutsThisWeek,
        hasWorkoutGoalAlreadyBeenAchieved,
    } = useLocalSearchParams<WorkoutStats>();
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
        const daysUntilWeeklyGoal = user.weeklyWorkoutGoal - Number(daysWithWorkoutsThisWeek);
        if (user.weeklyWorkoutGoal === 0) {
            return (
                <SizableText textAlign='center'>
                    You haven&apos;t set a weekly workout goal yet. Set a goal in your profile
                    settings to get weekly workout goal xp!
                </SizableText>
            );
        }
        if (daysUntilWeeklyGoal > 0) {
            if (Number(daysWithWorkoutsThisWeek) === 1) {
                return (
                    <SizableText textAlign='center'>
                        Way to kick off the week! You&apos;ve worked out 1 day so far! Keep it going
                        to hit your goal of {user.weeklyWorkoutGoal} days!
                    </SizableText>
                );
            }
            return (
                <SizableText textAlign='center'>
                    You&apos;ve worked out for {daysWithWorkoutsThisWeek}{' '}
                    {Number(daysWithWorkoutsThisWeek) === 1 ? 'day' : 'days'} this week! Only{' '}
                    {daysUntilWeeklyGoal} more {daysUntilWeeklyGoal === 1 ? 'day' : 'days'} to reach
                    your goal of {user.weeklyWorkoutGoal} days. Keep it up!
                </SizableText>
            );
        }
        if (daysUntilWeeklyGoal === 0 && hasWorkoutGoalAlreadyBeenAchieved !== 'true') {
            return (
                <SizableText textAlign='center'>
                    Fantastic! You hit your goal of {user.weeklyWorkoutGoal} workouts per week! Well
                    done!
                </SizableText>
            );
        }
        return (
            <SizableText textAlign='center'>
                You already hit your goal of {user.weeklyWorkoutGoal} per week. You&apos;ll continue
                to get bonus xp for each extra workout this week!
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
                    <YStack alignItems='center'>
                        {displayWorkoutEffort && (
                            <SizableText size='$5'>Workout Effort + {workoutEffortXp}</SizableText>
                        )}
                        {displayWorkoutGoal && (
                            <SizableText size='$5'>
                                Weekly Workout Goal + {workoutGoalXp}{' '}
                            </SizableText>
                        )}
                        {displayWeeklyStreak && (
                            <SizableText size='$5'>
                                Weekly Goal Streak + {workoutGoalStreakXp}{' '}
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
