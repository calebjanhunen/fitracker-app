import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopoverMenu from 'src/components/common/PopoverMenu';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { RootState } from 'src/redux/Store';
import { WORKOUT_FORM_STORAGE_KEY } from 'src/redux/workout-form/WorkoutFormMiddleware';
import { loadWorkoutOnRender } from 'src/redux/workout-form/WorkoutFormSlice';
import { useTheme, View } from 'tamagui';

export default function AppLayout() {
    const username = useSelector((state: RootState) => state.user.username);
    const dispatch = useDispatch();
    const { getFromStorage } = useLocalStorage();

    useEffect(() => {
        getFromStorage(WORKOUT_FORM_STORAGE_KEY)
            .then((result) => {
                if (result) {
                    dispatch(loadWorkoutOnRender(JSON.parse(result)));
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);
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
