import IonIcons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/Store';
import { SizableText, useTheme, View, XStack } from 'tamagui';

export default function ProfileSettings() {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const theme = useTheme();
    return (
        <View flex={1} paddingHorizontal='$space.3' backgroundColor={theme.background.val}>
            <XStack
                alignItems='center'
                justifyContent='space-between'
                marginTop='$space.3'
                onPress={() =>
                    router.push({
                        pathname: '/profile/WeeklyWorkoutGoalSelect',
                        params: { currentGoal: user.weeklyWorkoutGoal.toString() },
                    })
                }
            >
                <XStack alignItems='center' gap='$space.2'>
                    <IonIcons color={theme.gray12.val} name='flag-outline' size={24} />
                    <SizableText size='$5'>Weekly Workout Goal</SizableText>
                </XStack>
                <XStack alignItems='center' gap='$space.1'>
                    <SizableText size='$5' color='$gray10'>
                        {user.weeklyWorkoutGoal}
                    </SizableText>
                    <IonIcons name='chevron-forward-outline' size={24} color={theme.gray10.val} />
                </XStack>
            </XStack>
        </View>
    );
}
