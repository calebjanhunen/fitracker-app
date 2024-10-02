import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, useTheme, View } from 'tamagui';

import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import WorkoutTemplateCard from 'src/components/workout-tracker/home/WorkoutTemplateCard';
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
                marginTop='$space.4'
            >
                {isWorkoutInProgress ? 'Continue Workout' : 'Start Empty Workout'}
            </Button>
            <H2 marginTop='$space.6' marginBottom='$space.3'>
                Workout Templates
            </H2>
            <FlatList
                data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                numColumns={2}
                renderItem={() => <WorkoutTemplateCard />}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ItemSeparatorComponent={() => <View height='$1' />}
            />
        </SafeAreaView>
    );
}
