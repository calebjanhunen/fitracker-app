import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, H4, H6, Separator, View, XStack, YStack } from 'tamagui';

export default function PostWorkoutSummary() {
    const router = useRouter();
    const { xpGainedFromWeeklyGoal, totalGainedXp } = useLocalSearchParams<{
        xpGainedFromWeeklyGoal: string;
        totalGainedXp: string;
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
                <H4>XP gained from workout:</H4>
                <XStack gap='$space.3'>
                    <YStack alignItems='flex-end'>
                        <H6>Weekly Goal: </H6>
                        <Separator borderWidth='1' alignSelf='stretch' borderColor='$blue10' />
                        <H6>Total XP Gained: </H6>
                    </YStack>
                    <YStack alignItems='flex-end'>
                        <H6>{xpGainedFromWeeklyGoal}</H6>
                        <Separator borderWidth='1' alignSelf='stretch' borderColor='$blue10' />

                        <H6>{totalGainedXp}</H6>
                    </YStack>
                </XStack>
            </View>
            <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold' onPress={onBtnPress}>
                Return to Home
            </Button>
        </SafeAreaView>
    );
}
