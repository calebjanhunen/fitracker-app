import { Stack } from 'expo-router';
import React from 'react';
import WorkoutInProgressProvider from 'src/context/workout-tracker/IsWorkoutInProgressContext';

export default function WorkoutTrackerLayout() {
    return (
        <WorkoutInProgressProvider>
            <Stack>
                <Stack.Screen name='Home' options={{ headerShown: false }} />
                <Stack.Screen name='WorkoutForm' options={{ headerShown: false }} />
                <Stack.Screen
                    name='AddExercisesToWorkoutModal'
                    options={{
                        presentation: 'modal',
                        headerShown: false,
                    }}
                />
            </Stack>
        </WorkoutInProgressProvider>
    );
}
