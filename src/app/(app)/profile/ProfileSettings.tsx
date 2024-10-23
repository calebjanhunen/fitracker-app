import IonIcons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { RootState } from 'src/redux/Store';
import { SizableText, useTheme, View, XStack } from 'tamagui';

export default function ProfileSettings() {
    const user = useSelector((state: RootState) => state.user);
    const { logout } = useAuth();
    const router = useRouter();
    const theme = useTheme();

    return (
        <View flex={1} backgroundColor={theme.background.val}>
            <View flex={1}>
                <XStack
                    paddingHorizontal='$space.3'
                    alignItems='center'
                    justifyContent='space-between'
                    marginTop='$space.3'
                    onPress={() =>
                        router.push({
                            pathname: '/profile/WeeklyWorkoutGoalSelect',
                            params: { currentGoal: user.weeklyWorkoutGoal?.toString() },
                        })
                    }
                >
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons color={theme.gray12.val} name='flag-outline' size={24} />
                        <SizableText size='$5'>Weekly Workout Goal</SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.1'>
                        <SizableText size='$5' color='$gray10'>
                            {user.weeklyWorkoutGoal ?? 0}
                        </SizableText>
                        <IonIcons
                            name='chevron-forward-outline'
                            size={24}
                            color={theme.gray10.val}
                        />
                    </XStack>
                </XStack>
            </View>
            <TouchableOpacity
                style={{
                    paddingVertical: 16,
                    backgroundColor: theme.gray4.val,
                    marginBottom: 12,
                }}
                onPress={logout}
            >
                <SizableText color={theme.red10.val} size='$5' textAlign='center' fontWeight='bold'>
                    Logout
                </SizableText>
            </TouchableOpacity>
        </View>
    );
}
