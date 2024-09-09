import { Tabs } from 'expo-router';
import React from 'react';

export default function AppLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='WorkoutTracker' />
            <Tabs.Screen name='Profile' />
        </Tabs>
    );
}
