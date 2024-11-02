import { Stack } from 'expo-router';
import React from 'react';

export default function WorkoutFormLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='AddExercisesToWorkout' />
            <Stack.Screen name='ReplaceExercise' />
            <Stack.Screen name='[exerciseId]' options={{ presentation: 'modal' }} />
            <Stack.Screen name='PostWorkoutSummary' options={{ gestureEnabled: false }} />
        </Stack>
    );
}
