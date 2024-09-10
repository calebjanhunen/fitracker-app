import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function AppLayout() {
    return (
        <>
            <Tabs>
                <Tabs.Screen name='(workout-tracker)' options={{ headerShown: false }} />
                <Tabs.Screen name='(profile)' />
            </Tabs>
            <StatusBar barStyle='default' />
        </>
    );
}
