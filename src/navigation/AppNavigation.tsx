import React from 'react';

import { PortalHost } from '@gorhom/portal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import FindFriendsMainScreen from '../features/find-friends/screens/FindFriendsMainScreen';
import MessagingMainScreen from '../features/messaging/screens/MessagingMainScreen';
import ProfileMainScreen from '../features/profile/screens/ProfileMainScreen';
import SocialFeedMainScreen from '../features/social-feed/screens/SocialFeedMainScreen';
import ScreenDisplay from './ScreenDisplay';
import WorkoutTrackerNavigation from './WorkoutTrackerNavigation';

const Tab = createBottomTabNavigator();

const screenOptions = {
    headerShown: false,
};

export default function AppNavigation(): React.ReactElement {
    // TODO: Reset initialRouteName -> for dev purposes
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions} initialRouteName='Workout Tracker'>
                <Tab.Screen name='Home'>
                    {() => <ScreenDisplay screenComponent={<SocialFeedMainScreen />} />}
                </Tab.Screen>
                <Tab.Screen name='Friends'>
                    {() => <ScreenDisplay screenComponent={<FindFriendsMainScreen />} />}
                </Tab.Screen>
                <Tab.Screen name='Workout Tracker'>
                    {() => <ScreenDisplay screenComponent={<WorkoutTrackerNavigation />} />}
                </Tab.Screen>
                <Tab.Screen name='Messaging'>
                    {() => <ScreenDisplay screenComponent={<MessagingMainScreen />} />}
                </Tab.Screen>
                <Tab.Screen name='Profile'>
                    {() => <ScreenDisplay screenComponent={<ProfileMainScreen />} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
