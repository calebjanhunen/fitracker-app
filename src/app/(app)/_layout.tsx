import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSelector } from 'react-redux';
import PopoverMenu from 'src/components/common/PopoverMenu';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { RootState } from 'src/redux/Store';
import { useTheme, View } from 'tamagui';

export default function AppLayout() {
    const username = useSelector((state: RootState) => state.user.username);
    return (
        <>
            <Tabs>
                <Tabs.Screen
                    name='(workout-tracker)'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Start Workout',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='barbell-outline' color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='(profile)'
                    options={{
                        title: username,
                        headerRight: ProfileScreenHeaderRightComponent,
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='person-outline' color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}

function ProfileScreenHeaderRightComponent() {
    const theme = useTheme();
    const { logout } = useAuth();

    return (
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
    );
}
