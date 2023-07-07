import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import FindFriendsMainScreen from '../features/find-friends/screens/FindFriendsMainScreen';
import MessagingMainScreen from '../features/messaging/screens/MessagingMainScreen';
import ProfileMainScreen from '../features/profile/screens/ProfileMainScreen';
import SocialFeedMainScreen from '../features/social-feed/screens/SocialFeedMainScreen';
import WorkoutTrackerMainScreen from '../features/workout-tracker/screens/WorkoutTrackerMainScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
    headerShown: false,
};

export default function AppNavigation(): React.ReactElement {
    // TODO: Reset initialRouteName -> for dev purposes
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions} initialRouteName='Workout Tracker'>
                <Tab.Screen name='Home' component={SocialFeedMainScreen} />
                <Tab.Screen name='Friends' component={FindFriendsMainScreen} />
                <Tab.Screen name='Workout Tracker' component={WorkoutTrackerMainScreen} />
                <Tab.Screen name='Message' component={MessagingMainScreen} />
                <Tab.Screen name='Profile' component={ProfileMainScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
