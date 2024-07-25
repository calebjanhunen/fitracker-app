/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, List, Spinner, Text } from '@ui-kitten/components';

import { StyleSheet, View } from 'react-native';
import { PageView, Spacer } from 'src/components';
import { useGetWorkouts } from 'src/hooks/api/workouts/useGetWorkouts';
import { useWorkoutInProgress } from 'src/hooks/useWorkoutInProgress';
import { type Workout } from 'src/interfaces/workout';
import { type WorkoutTrackerStackParamList } from 'src/navigation/workout-tracker-navigation';
import WorkoutHistoryCard from 'src/screens/workout-tracker-screen/components/workout-tracker-home/workout-history-card';
import SelectWorkoutTemplateModal from '../components/select-workout-template-modal/select-workout-template-modal';

type Props = StackScreenProps<WorkoutTrackerStackParamList, 'Home'>;

export default function WorkoutTrackerHomeScreen({ navigation }: Props): React.ReactElement {
    const [workoutTemplateModalVisible, setWorkoutTemplateModalVisible] = useState<boolean>(false);
    const { workouts, isLoading, error } = useGetWorkouts();
    const { workoutInProgress, setWorkoutInProgress } = useWorkoutInProgress();
    const renderWorkoutHistoryCard = ({ item }: { item: Workout }): React.ReactElement => (
        <WorkoutHistoryCard workout={item} />
    );

    function handleGoToWorkoutFormPage(): void {
        navigation.navigate('WorkoutTrackerForm');
        if (!workoutInProgress) setWorkoutInProgress(true);
    }
    return (
        <PageView>
            <SelectWorkoutTemplateModal
                visible={workoutTemplateModalVisible}
                setVisible={setWorkoutTemplateModalVisible}
            />
            <Spacer size='spacing-4' />
            {workoutInProgress ? (
                <Button onPress={handleGoToWorkoutFormPage}>Continue Workout</Button>
            ) : (
                <View style={styles.header}>
                    <Button onPress={() => setWorkoutTemplateModalVisible(true)}>
                        Start From Template
                    </Button>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <Button onPress={handleGoToWorkoutFormPage} size='small' appearance='outline'>
                        Start Empty Workout
                    </Button>
                </View>
            )}

            <Spacer size='spacing-5' />
            <Text category='h4'>Workout History:</Text>
            <View style={styles.workoutHistoryContainer}>
                {isLoading ? (
                    <Spinner size='giant' />
                ) : error ? (
                    <Text status='danger'>Error getting workouts: {error}</Text>
                ) : workouts ? (
                    <List
                        data={workouts}
                        renderItem={renderWorkoutHistoryCard}
                        keyExtractor={(item) => item.id}
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
    },
    header: {
        gap: 8,
    },
});
