import React from 'react';

import * as eva from '@eva-design/eva';
import '@expo/metro-runtime';
import { QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider } from '@ui-kitten/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { DevToolsBubble } from 'react-native-react-query-devtools';

import { StatusBar } from 'react-native';
import { queryClient } from 'src/api/config/react-query.config';
import BaseNavigation from 'src/navigation/base-navigation';
import { AuthProvider } from 'src/state/context/auth-context';
import { WorkoutFormProvider } from 'src/state/context/workout-form-context';
import { WorkoutInProgressProvider } from 'src/state/context/workout-in-progress-context';

export default function App(): React.ReactElement | null {
    return (
        <QueryClientProvider client={queryClient}>
            <ApplicationProvider {...eva} theme={eva.light}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AuthProvider>
                        <WorkoutFormProvider>
                            <WorkoutInProgressProvider>
                                <MenuProvider>
                                    <BaseNavigation />
                                    <StatusBar
                                        barStyle='dark-content'
                                        backgroundColor='transparent'
                                    />
                                </MenuProvider>
                            </WorkoutInProgressProvider>
                        </WorkoutFormProvider>
                    </AuthProvider>
                </GestureHandlerRootView>
            </ApplicationProvider>
            <DevToolsBubble />
        </QueryClientProvider>
    );
}
