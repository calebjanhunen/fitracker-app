import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from 'src/screens/profile/profile-screen';
import WorkoutTrackerNavigation from './workout-tracker-navigation';

const Tab = createBottomTabNavigator();

export default function AppNavigation(): React.ReactElement {
    return (
        <Tab.Navigator initialRouteName='Start Workout'>
            <Tab.Screen
                name='Start Workout'
                options={{ headerShown: false }}
                component={WorkoutTrackerNavigation}
            />
            <Tab.Screen name='Profile' options={{ headerShown: false }} component={ProfileScreen} />
        </Tab.Navigator>
    );
}
