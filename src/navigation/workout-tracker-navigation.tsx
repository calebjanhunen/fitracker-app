import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import type { WorkoutTemplate } from 'src/interfaces';
import CreateWorkoutTemplate from 'src/screens/workout-tracker-screen/screens/create-workout-template-form/create-workout-template.screen';
import WorkoutTrackerFormScreen from 'src/screens/workout-tracker-screen/screens/workout-tracker-form.screen';
import WorkoutTrackerHomeScreen from 'src/screens/workout-tracker-screen/screens/workout-tracker-home.screen';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type WorkoutTrackerStackParamList = {
    Home: undefined;
    WorkoutTrackerForm: {
        selectedWorkoutTemplate: WorkoutTemplate | null;
    };
    CreateWorkoutTemplate: undefined;
};

const Stack = createStackNavigator<WorkoutTrackerStackParamList>();

export default function WorkoutTrackerNavigation(): React.ReactElement {
    return (
        <Stack.Navigator screenOptions={{ title: '' }}>
            <Stack.Screen
                name='Home'
                options={{ headerShown: false }}
                component={WorkoutTrackerHomeScreen}
            />
            <Stack.Screen
                name='WorkoutTrackerForm'
                component={WorkoutTrackerFormScreen}
                options={() => ({})}
            />
            <Stack.Screen name='CreateWorkoutTemplate' component={CreateWorkoutTemplate} />
        </Stack.Navigator>
    );
}
