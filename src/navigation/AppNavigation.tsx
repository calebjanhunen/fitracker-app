import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type ParamListBase, type RouteProp } from '@react-navigation/native';
import { styled } from 'styled-components';

import FindFriendsMainScreen from '../features/find-friends/screens/FindFriendsMainScreen';
import MessagingMainScreen from '../features/messaging/screens/MessagingMainScreen';
import ProfileMainScreen from '../features/profile/screens/ProfileMainScreen';
import SocialFeedMainScreen from '../features/social-feed/screens/SocialFeedMainScreen';
import ScreenDisplay from './ScreenDisplay';
import WorkoutTrackerNavigation from './WorkoutTrackerNavigation';

const Tab = createBottomTabNavigator();

const Icon = styled(Ionicons)`
    color: ${(props) => props.theme.colors.primary};
`;

function tabBarIcon(route: RouteProp<ParamListBase>, focused: boolean): React.ReactElement {
    switch (route.name) {
        case 'Home':
            return <Icon name={`home${!focused ? '-outline' : ''}`} size={38} />;
        case 'Friends':
            return <Icon name={`people${!focused ? '-outline' : ''}`} size={38} />;
        case 'Start Workout':
            return <Icon name={`barbell${!focused ? '-outline' : ''}`} size={38} />;
        case 'Messaging':
            return <Icon name={`chatbubbles${!focused ? '-outline' : ''}`} size={38} />;
        case 'Profile':
            return <Icon name={`person${!focused ? '-outline' : ''}`} size={38} />;
        default:
            return <></>;
    }
}

export default function AppNavigation(): React.ReactElement {
    // TODO: Reset initialRouteName -> for dev purposes
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => tabBarIcon(route, focused),
                tabBarShowLabel: false,
            })}
            initialRouteName='Start Workout'
        >
            <Tab.Screen name='Home'>
                {() => <ScreenDisplay screenComponent={<SocialFeedMainScreen />} />}
            </Tab.Screen>
            <Tab.Screen name='Friends'>
                {() => <ScreenDisplay screenComponent={<FindFriendsMainScreen />} />}
            </Tab.Screen>
            <Tab.Screen name='Start Workout'>
                {() => <ScreenDisplay screenComponent={<WorkoutTrackerNavigation />} />}
            </Tab.Screen>
            <Tab.Screen name='Messaging'>
                {() => <ScreenDisplay screenComponent={<MessagingMainScreen />} />}
            </Tab.Screen>
            <Tab.Screen name='Profile'>
                {() => <ScreenDisplay screenComponent={<ProfileMainScreen />} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
