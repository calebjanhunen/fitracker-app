import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import PopoverMenu from 'src/components/common/popover-menu';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { View } from 'tamagui';

export default function AppLayout() {
    const { logout } = useAuth();
    return (
        <>
            <Tabs>
                <Tabs.Screen name='(workout-tracker)' options={{ headerShown: false }} />
                <Tabs.Screen
                    name='(profile)'
                    options={{
                        title: 'Profile',
                        headerRight: () => (
                            <View marginRight='$space.4'>
                                <PopoverMenu
                                    onDelete={() => {
                                        void logout();
                                    }}
                                />
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
