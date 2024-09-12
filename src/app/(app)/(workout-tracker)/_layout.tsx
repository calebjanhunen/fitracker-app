import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import WorkoutInProgressProvider from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { useTheme } from 'tamagui';

export default function WorkoutTrackerLayout() {
    const theme = useTheme();
    return (
        <WorkoutInProgressProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.blue11.val,
                    },
                }}
            >
                <Stack.Screen name='home' options={{ headerShown: false }} />
                <Stack.Screen name='workout-form' options={{ headerTitle: '' }} />
            </Stack>
            <StatusBar barStyle='dark-content' />
        </WorkoutInProgressProvider>
    );
}
