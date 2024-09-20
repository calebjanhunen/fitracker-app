import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, useTheme } from 'tamagui';

import { useDispatch } from 'react-redux';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { updatedCreatedAt } from 'src/redux/workout-form/WorkoutFormSlice';

export default function Home() {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const { isWorkoutInProgress, setWorkoutInProgress } = useIsWorkoutInProgress();

    function onStartWorkoutPress() {
        if (!isWorkoutInProgress) {
            setWorkoutInProgress(true);
            dispatch(updatedCreatedAt());
        }
        router.push('WorkoutForm');
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.background.val, paddingHorizontal: 16 }}
        >
            <Button
                fontWeight='bold'
                backgroundColor='$color.green8Light'
                color='white'
                onPress={onStartWorkoutPress}
            >
                {isWorkoutInProgress ? 'Continue Workout' : 'Start Workout'}
            </Button>
        </SafeAreaView>
    );
}
