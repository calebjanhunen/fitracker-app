/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo } from 'react';

import { Button, Layout, List, Text } from '@ui-kitten/components';
import { Platform, StyleSheet, View } from 'react-native';

import { MoreOptionsMenu, Spacer, type MoreOptionsMenuItem } from 'src/components';
import type { IWorkoutTemplateFormExercise, SetType, WorkoutTemplateSet } from 'src/interfaces';
import WorkoutTemplateSetComponent from './workout-template-set';

interface Props {
    exercise: IWorkoutTemplateFormExercise;
    deleteExercise: (exerciseId: string) => void;
    addSet: (exerciseId: string, setOrder: number, setType: SetType) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
    drag: () => void;
    isActive: boolean;
}

const WorkoutTemplateExercise = memo(function WorkoutTemplateExercise({
    exercise,
    addSet,
    deleteExercise,
    deleteSet,
    drag,
    isActive,
}: Props): React.ReactElement {
    const menuItems: MoreOptionsMenuItem[] = [
        {
            onSelect: handleDeleteExercise,
            text: 'Delete',
            icon: 'trash',
            iconColor: 'color-danger-500',
        },
        {
            onSelect: () => {},
            text: 'Replace Exercise',
            icon: 'repeat',
            iconColor: 'color-primary-500',
        },
    ];
    const renderSet = ({
        item,
        index,
    }: {
        item: WorkoutTemplateSet;
        index: number;
    }): React.ReactElement | null => (
        <WorkoutTemplateSetComponent
            set={item}
            order={item.order}
            exerciseId={exercise.exerciseId}
            deleteSet={deleteSet}
        />
    );

    function handleDeleteExercise(): void {
        deleteExercise(exercise.exerciseId);
    }

    function handleStartReorder(): void {
        drag();
    }

    return (
        <Layout style={(isActive && styles.shadow, { paddingVertical: 10 })}>
            <View style={styles.exerciseHeader}>
                <Text
                    style={styles.exerciseName}
                    status='info'
                    category='h6'
                    numberOfLines={1}
                    onLongPress={handleStartReorder}
                >
                    {exercise.name}
                </Text>
                <MoreOptionsMenu menuItems={menuItems} />
            </View>
            <Spacer size='spacing-2' />
            <View style={styles.setHeader}>
                <Text category='label' style={styles.setNum}>
                    Set
                </Text>
                <Text category='label' style={styles.previous}>
                    Previous
                </Text>
                <Text category='label' style={styles.setInfo}>
                    Weight
                </Text>
                <Text category='label' style={styles.setInfo}>
                    Reps
                </Text>
                <Text category='label' style={styles.rpeHeading}>
                    RPE
                </Text>
            </View>
            <Spacer size='spacing-4' />
            <List data={exercise.sets} renderItem={renderSet} keyExtractor={(item) => item.id} />
            <Spacer size='spacing-3' />
            <Button
                size='tiny'
                appearance='outline'
                onPress={() => addSet(exercise.exerciseId, exercise.sets.length + 1, 'working')}
            >
                Add Set
            </Button>
        </Layout>
    );
});
export default WorkoutTemplateExercise;

const styles = StyleSheet.create({
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    exerciseName: {
        flex: 1,
    },
    setHeader: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
    },
    setNum: {
        flex: 0.5,
        textAlign: 'center',
    },
    previous: {
        flex: 2,
        textAlign: 'center',
    },
    setInfo: {
        flex: 1,
        textAlign: 'center',
    },
    rpeHeading: {
        flex: 0.7,
        textAlign: 'center',
    },
    hiddenItem: {
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        justifyContent: 'flex-end',
    },
});
