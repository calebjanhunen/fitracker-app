import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components';

import { TouchableOpacity } from 'react-native';
import LoginScreen from '../features/account-creation/login/LoginScreen';
import Signup1 from '../features/account-creation/signup/screens/Signup1_AccountInfo';
import FitnessGoals from '../features/account-creation/signup/screens/Signup2_FitnessGoals';
import WorkoutTypes from '../features/account-creation/signup/screens/Signup3_WorkoutTypes';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
    Login: undefined;
    Signup1: undefined;
    FitnessGoals: undefined;
    WorkoutTypes: undefined;
    SkillLevel: undefined;
    SelectLocation: undefined;
    WorkoutDays: undefined;
    WorkoutTimes: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Icon = styled(Ionicons)`
    color: ${(props) => props.theme.colors.primary};
`;

export default function AccountNavigation(): React.ReactElement {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerShown: true,
                headerBackTitleVisible: false,
                headerShadowVisible: false,
                title: '',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='chevron-back-outline' size={36} />
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Signup1' component={Signup1} />
            <Stack.Screen name='FitnessGoals' component={FitnessGoals} />
            <Stack.Screen name='WorkoutTypes' component={WorkoutTypes} />
        </Stack.Navigator>
    );
}
