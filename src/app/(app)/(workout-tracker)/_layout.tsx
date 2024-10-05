import { Stack } from 'expo-router';
import React from 'react';
import WorkoutInProgressProvider from 'src/context/workout-tracker/IsWorkoutInProgressContext';

export default function WorkoutTrackerLayout() {
    return (
        <WorkoutInProgressProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' />
                <Stack.Screen name='WorkoutForm' />
                <Stack.Screen name='WorkoutTemplateForm' />
                <Stack.Screen name='AddExercisesToWorkoutModal' />
                <Stack.Screen name='PostWorkoutSummary' options={{ gestureEnabled: false }} />
            </Stack>
        </WorkoutInProgressProvider>
    );
}
