import IonIcons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'tamagui';

export default function ProfileLayout() {
    const theme = useTheme();
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Profile',
                    headerRight: () => (
                        <Link href='/profile/ProfileSettings' asChild>
                            <TouchableOpacity>
                                <IonIcons color={theme.gray12.val} size={34} name='menu-outline' />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen
                name='[workoutId]'
                options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
                name='WeeklyWorkoutGoalSelect'
                options={{
                    headerTitle: 'Select Weekly Workout Goal',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name='ProfileSettings'
                options={{
                    headerTitle: 'Settings',
                    headerBackTitleVisible: false,
                }}
            />
        </Stack>
    );
}
