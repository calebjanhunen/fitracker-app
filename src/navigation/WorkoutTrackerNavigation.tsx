import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import StartWorkoutScreen from '../features/workout-tracker/screens/StartWorkoutScreen';
import WorkoutTrackerMainScreen from '../features/workout-tracker/screens/WorkoutTrackerMainScreen';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
    WorkoutTrackerHome: undefined;
    StartWorkout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function WorkoutTrackerNavigation(): React.ReactElement {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='WorkoutTrackerHome' component={WorkoutTrackerMainScreen} />
            <Stack.Screen name='StartWorkout' component={StartWorkoutScreen} />
        </Stack.Navigator>
    );
}
