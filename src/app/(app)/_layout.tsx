import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useGetCurrentUser } from 'src/api/hooks';
import { LocalStorageKeys } from 'src/constants/LocalStorageKeys';
import { Roles } from 'src/constants/roles';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { loadWorkoutOnRender } from 'src/redux/workout-form/WorkoutFormSlice';

const { width, height } = Dimensions.get('window');

export default function AppLayout() {
    const { data: user } = useGetCurrentUser();
    const dispatch = useDispatch();
    const { getFromStorage } = useLocalStorage();

    useEffect(() => {
        getFromStorage(LocalStorageKeys.workoutForm)
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
        <View style={{ width, height }}>
            <Tabs>
                <Tabs.Screen
                    name='workout-tracker'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Start Workout',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='home-outline' color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='exercises'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Exercises',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='barbell-outline' color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='leaderboard'
                    options={{
                        href: user?.role === Roles.ADMIN ? 'leaderboard' : null,
                        headerShown: false,
                        tabBarLabel: 'Leaderboard',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='podium-outline' color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='person-outline' color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
        </View>
    );
}
