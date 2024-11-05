import { Stack } from 'expo-router';
import React from 'react';
import EditExerciseModalProvider from 'src/context/workout-tracker/EditExerciseModalContext';

export default function WorkoutFormLayout() {
    return (
        <EditExerciseModalProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='AddExercisesToWorkout' />
                <Stack.Screen name='ReplaceExercise' />
                <Stack.Screen name='[exerciseId]' options={{ presentation: 'modal' }} />
                <Stack.Screen name='PostWorkoutSummary' options={{ gestureEnabled: false }} />
            </Stack>
        </EditExerciseModalProvider>
    );
}
