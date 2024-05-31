import React from 'react';

import * as eva from '@eva-design/eva';
import '@expo/metro-runtime';
import { ApplicationProvider } from '@ui-kitten/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';

import { StatusBar } from 'react-native';
import BaseNavigation from 'src/navigation/base-navigation';
import { AuthProvider } from 'src/state/context/auth-context';
import { WorkoutFormProvider } from 'src/state/context/workout-form-context';
import { WorkoutInProgressProvider } from 'src/state/context/workout-in-progress-context';

export default function App(): React.ReactElement | null {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <AuthProvider>
                    <WorkoutFormProvider>
                        <WorkoutInProgressProvider>
                            <MenuProvider>
                                <BaseNavigation />
                                <StatusBar barStyle='dark-content' backgroundColor='transparent' />
                            </MenuProvider>
                        </WorkoutInProgressProvider>
                    </WorkoutFormProvider>
                </AuthProvider>
            </GestureHandlerRootView>
        </ApplicationProvider>
    );
}
