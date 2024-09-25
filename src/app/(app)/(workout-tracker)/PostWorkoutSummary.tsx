import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getOrdinalSuffix } from 'src/utils/getOrdinalSuffix';
import { Button, H2, H4, H5, H6, Separator, View, XStack, YStack } from 'tamagui';

export default function PostWorkoutSummary() {
    const router = useRouter();
    const {
        currentWorkoutStreak,
        baseXpGain,
        xpGainedFromWorkoutDuration,
        xpGainedFromWorkoutStreak,
        totalXpGained,
        totalUserXp,
    } = useLocalSearchParams<{
        currentWorkoutStreak: string;
        baseXpGain: string;
        xpGainedFromWorkoutDuration: string;
        xpGainedFromWorkoutStreak: string;
        totalXpGained: string;
        totalUserXp: string;
    }>();

    function onBtnPress() {
        router.dismissAll();
    }
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
                <H6 paddingBottom='$space.10'>
                    This is your {currentWorkoutStreak}
                    {getOrdinalSuffix(parseInt(currentWorkoutStreak))} workout in a row
                </H6>
                <H4>XP gained from workout:</H4>
                <XStack gap='$space.3'>
                    <YStack alignItems='flex-end'>
                        <H6>Base XP Gained: </H6>
                        <H6>workout length: </H6>
                        <H6>workout streak: </H6>
                        <Separator borderWidth='1' alignSelf='stretch' borderColor='$blue10' />
                        <H6>Total XP Gained: </H6>
                    </YStack>
                    <YStack alignItems='flex-end'>
                        <H6>{baseXpGain}</H6>
                        <H6>{xpGainedFromWorkoutDuration}</H6>
                        <H6>{xpGainedFromWorkoutStreak}</H6>
                        <Separator borderWidth='1' alignSelf='stretch' borderColor='$blue10' />

                        <H6>{totalXpGained}</H6>
                    </YStack>
                </XStack>
            </View>
            <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold' onPress={onBtnPress}>
                Return to Home
            </Button>
        </SafeAreaView>
    );
}
