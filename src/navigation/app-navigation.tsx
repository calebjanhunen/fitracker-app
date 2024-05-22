import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WorkoutTrackerHomeScreen from 'src/screens/workout-tracker-screen/screens/workout-tracker-home.screen';

const Tab = createBottomTabNavigator();

export default function AppNavigation(): React.ReactElement {
    return (
        <Tab.Navigator initialRouteName='Start Workout'>
            <Tab.Screen
                name='Start Workout'
                options={{ headerShown: false }}
                component={WorkoutTrackerHomeScreen}
            />
        </Tab.Navigator>
    );
}
