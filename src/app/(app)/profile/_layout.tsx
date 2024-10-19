import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' />
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
        </Stack>
    );
}
