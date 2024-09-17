import { Tabs } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';
import PopoverMenu from 'src/components/common/PopoverMenu';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { RootState } from 'src/redux/Store';
import { useTheme, View } from 'tamagui';

export default function AppLayout() {
    const { logout } = useAuth();
    const theme = useTheme();
    const username = useSelector((state: RootState) => state.user.username);
    return (
        <>
            <Tabs>
                <Tabs.Screen name='(workout-tracker)' options={{ headerShown: false }} />
                <Tabs.Screen
                    name='(profile)'
                    options={{
                        title: username,
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
