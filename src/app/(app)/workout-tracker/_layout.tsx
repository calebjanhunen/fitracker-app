import { Stack } from 'expo-router';
import React from 'react';
import WorkoutInProgressProvider from 'src/context/workout-tracker/IsWorkoutInProgressContext';

export default function WorkoutTrackerLayout() {
    return (
        <WorkoutInProgressProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' options={{ gestureEnabled: false }} />
                <Stack.Screen name='workout-form' />
                <Stack.Screen name='workout-template-form' />
            </Stack>
        </WorkoutInProgressProvider>
    );
}
