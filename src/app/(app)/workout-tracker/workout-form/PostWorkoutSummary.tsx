import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Easing } from 'react-native';
import * as Progress2 from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useProgressBar } from 'src/hooks/workout-tracker/useProgressBar';
import { RootState } from 'src/redux/Store';
import { getOrdinalSuffix } from 'src/utils';
import { Button, Circle, H3, SizableText, useTheme, View, XStack } from 'tamagui';

export default function PostWorkoutSummary() {
    const user = useSelector((state: RootState) => state.user);
    const {
        currentXpBeforeWorkout,
        levelBeforeWorkout,
        workoutEffortXp,
        workoutGoalXp,
        workoutGoalStreakXp,
        daysWithWorkoutThisWeek,
    } = useLocalSearchParams<{
        currentXpBeforeWorkout: string;
        levelBeforeWorkout: string;
        workoutEffortXp: string;
        workoutGoalXp: string;
        workoutGoalStreakXp: string;
        daysWithWorkoutThisWeek: string;
    }>();
    const daysUntilWeeklyGoal = user.weeklyWorkoutGoal - Number(daysWithWorkoutThisWeek);
    const theme = useTheme();
    const {
        level,
        progress,
        isAnimated,
        duration,
        currentXpSourceName,
        currentXpSourceVal,
        totalXp,
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
                    <Progress2.Bar
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
                <XStack justifyContent='space-between' paddingTop='$space.2'>
                    <View>
                        {currentXpSourceName && (
                            <SizableText size='$5'>
                                {currentXpSourceName}: {currentXpSourceVal} XP
                            </SizableText>
                        )}
                    </View>
                    <SizableText>{totalXp}</SizableText>
                </XStack>
            </View>
            <Link href='workout-tracker' asChild>
                <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold'>
                    Return to Home
                </Button>
            </Link>
        </SafeAreaView>
    );
}
