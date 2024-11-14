import IonIcons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useLogout } from 'src/hooks/auth/useLogout';
import { RootState } from 'src/redux/Store';
import { SizableText, useTheme, View, XStack } from 'tamagui';

export default function ProfileSettings() {
    const user = useSelector((state: RootState) => state.user);
    const theme = useTheme();
    const { logout } = useLogout();

    function onLogoutPress() {
        Alert.alert('Are you sure you want to logout?', '', [
            { text: 'Logout', style: 'destructive', onPress: () => logout() },
            { text: 'Cancel', style: 'cancel' },
        ]);
    }

    return (
        <View flex={1} backgroundColor={theme.background.val}>
            <View flex={1}>
                <Link
                    href={{
                        pathname: '/profile/WeeklyWorkoutGoalSelect',
                        params: { currentGoal: user.weeklyWorkoutGoal?.toString() },
                    }}
                    asChild
                >
                    <XStack
                        paddingHorizontal='$space.3'
                        alignItems='center'
                        justifyContent='space-between'
                        marginTop='$space.3'
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
                </Link>
            </View>
            <TouchableOpacity
                style={{
                    paddingVertical: 16,
                    backgroundColor: theme.gray4.val,
                    marginBottom: 12,
                }}
                onPress={onLogoutPress}
            >
                <SizableText color={theme.red10.val} size='$5' textAlign='center' fontWeight='bold'>
                    Logout
                </SizableText>
            </TouchableOpacity>
        </View>
    );
}
