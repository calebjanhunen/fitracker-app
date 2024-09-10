import { Tabs } from 'expo-router';
import React from 'react';

export default function AppLayout() {
    return (
        <>
            <Tabs>
                <Tabs.Screen name='(workout-tracker)' options={{ headerShown: false }} />
                <Tabs.Screen name='(profile)' />
            </Tabs>
        </>
    );
}
