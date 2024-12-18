import { Stack } from 'expo-router';
import React from 'react';

export default function WorkoutTemplateFormLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='AddExercisesToTemplate' />
            <Stack.Screen name='ReplaceExercise' />
        </Stack>
    );
}
