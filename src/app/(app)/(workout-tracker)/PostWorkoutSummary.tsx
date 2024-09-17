import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, H6, View, XStack, YStack } from 'tamagui';

export default function PostWorkoutSummary() {
    const router = useRouter();
    const { xpGained, totalXp } = useLocalSearchParams<{
        workoutId: string;
        xpGained: string;
        totalXp: string;
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
                <H2 paddingBottom='$space.10'>Workout Completed!</H2>
                <XStack gap='$3'>
                    <YStack alignItems='flex-end'>
                        <H6>XP Gained: </H6>
                        <H6>Total XP: </H6>
                    </YStack>
                    <YStack alignItems='flex-end'>
                        <H6>{xpGained}</H6>
                        <H6>{totalXp}</H6>
                    </YStack>
                </XStack>
            </View>
            <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold' onPress={onBtnPress}>
                Return to Home
            </Button>
        </SafeAreaView>
    );
}
