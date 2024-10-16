import { Stack } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';
import PopoverMenu from 'src/components/common/popover-menu/PopoverMenu';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { RootState } from 'src/redux/Store';
import { useTheme, View } from 'tamagui';

export default function ProfileLayout() {
    const username = useSelector((state: RootState) => state.user.username);
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: username,
                    headerRight: HeaderRight,
                }}
            />
            <Stack.Screen
                name='[workoutId]'
                options={{ headerShown: false, presentation: 'modal' }}
            />
        </Stack>
    );
}

function HeaderRight() {
    const theme = useTheme();
    const { logout } = useAuth();

    return (
        <View>
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
    );
}
