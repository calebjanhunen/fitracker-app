import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { WORKOUT_FORM_STORAGE_KEY } from 'src/redux/workout-form/WorkoutFormMiddleware';
import { loadWorkoutOnRender } from 'src/redux/workout-form/WorkoutFormSlice';

export default function AppLayout() {
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
                    name='workout-tracker'
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Start Workout',
                        tabBarIcon: ({ color, size }) => (
                            <IonIcons name='barbell-outline' color={color} size={size} />
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
        </>
    );
}
