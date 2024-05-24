import React from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Layout, List, Spinner, Text } from '@ui-kitten/components';

import { StyleSheet, View } from 'react-native';
import { PageView, Spacer } from 'src/components';
import { useWorkouts } from 'src/hooks/useWorkouts';
import { type Workout } from 'src/interfaces/workout';
import { type WorkoutTrackerStackParamList } from 'src/navigation/workout-tracker-navigation';
import WorkoutHistoryCard from 'src/screens/workout-tracker-screen/components/workout-history-card';

type Props = StackScreenProps<WorkoutTrackerStackParamList, 'Home'>;

export default function WorkoutTrackerHomeScreen({ navigation }: Props): React.ReactElement {
    const { workouts, isLoading, error } = useWorkouts();
    const renderWorkoutHistoryCard = ({ item }: { item: Workout }): React.ReactElement => (
        <WorkoutHistoryCard workout={item} />
    );

    function onBtnPress(): void {
        navigation.navigate('WorkoutTrackerForm');
    }

    return (
        <PageView>
            <Spacer size='spacing-4' />
            <Button onPress={onBtnPress}>Start Empty Workout</Button>
            <Spacer size='spacing-5' />
            <Text category='h4'>Workout History:</Text>
            <View style={styles.workoutHistoryContainer}>
                {isLoading ? (
                    <Spinner size='giant' />
                ) : error ? (
                    <Text status='danger'>{error}</Text>
                ) : workouts ? (
                    <List
                        data={workouts}
                        renderItem={renderWorkoutHistoryCard}
                        ItemSeparatorComponent={() => <Spacer size='spacing-4' />}
                        style={{ backgroundColor: 'transparent' }}
                    />
                ) : (
                    <Text>No Workouts to display</Text>
                )}
            </View>
        </PageView>
    );
}

const styles = StyleSheet.create({
    workoutHistoryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
