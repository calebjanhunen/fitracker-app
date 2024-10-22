import Constants from 'expo-constants';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, H4, H6, Separator, SizableText, View, XStack, YStack } from 'tamagui';
export default function PostWorkoutSummary() {
    const { xpGainedFromWeeklyGoal, totalGainedXp } = useLocalSearchParams<{
        xpGainedFromWeeklyGoal: string;
        totalGainedXp: string;
        totalUserXp: string;
    }>();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View alignItems='center' justifyContent='center' flex={1}>
                <H2 paddingBottom='$space.3'>Workout Completed!</H2>
                {Constants.expoConfig?.extra?.ENVIRONMENT !== 'development' ? (
                    <>
                        <SizableText color='$orange10'>
                            ====================================
                        </SizableText>
                        <SizableText color='$orange10' fontWeight='bold'>
                            Workout XP calulation is under construction
                        </SizableText>
                        <SizableText color='$orange10'>
                            ====================================
                        </SizableText>
                    </>
                ) : (
                    <>
                        <H4>XP gained from workout:</H4>
                        <XStack gap='$space.3'>
                            <YStack alignItems='flex-end'>
                                <H6>Weekly Goal: </H6>
                                <Separator
                                    borderWidth='1'
                                    alignSelf='stretch'
                                    borderColor='$blue10'
                                />
                                <H6>Total XP Gained: </H6>
                            </YStack>
                            <YStack alignItems='flex-end'>
                                <H6>{xpGainedFromWeeklyGoal}</H6>
                                <Separator
                                    borderWidth='1'
                                    alignSelf='stretch'
                                    borderColor='$blue10'
                                />

                                <H6>{totalGainedXp}</H6>
                            </YStack>
                        </XStack>
                    </>
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
