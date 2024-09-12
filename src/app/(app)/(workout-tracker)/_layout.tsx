import { Stack } from 'expo-router';
import React from 'react';
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
                <Stack.Screen name='Home' options={{ headerShown: false }} />
                <Stack.Screen name='WorkoutForm' options={{ headerTitle: '' }} />
            </Stack>
        </WorkoutInProgressProvider>
    );
}
