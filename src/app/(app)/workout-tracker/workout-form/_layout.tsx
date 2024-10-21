import { Stack } from 'expo-router';
import React from 'react';

export default function WorkoutFormLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='AddExercisesToWorkoutModal' />
            <Stack.Screen name='ReplaceExercise' />
            <Stack.Screen name='PostWorkoutSummary' options={{ gestureEnabled: false }} />
        </Stack>
    );
}
