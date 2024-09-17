import { Tabs } from 'expo-router';
import React from 'react';
import PopoverMenu from 'src/components/common/PopoverMenu';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { useTheme, View } from 'tamagui';

export default function AppLayout() {
    const { logout } = useAuth();
    const theme = useTheme();
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
                                    menuOptions={[
                                        {
                                            text: 'Logout',
                                            icon: 'log-out',
                                            iconColor: theme.background.val,
                                            action: logout,
                                        },
                                    ]}
                                />
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
