/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo } from 'react';

import { Button, Text } from '@ui-kitten/components';
import { Dimensions, StyleSheet, View, type ListRenderItemInfo } from 'react-native';
import { SwipeListView, type RowMap } from 'react-native-swipe-list-view';

import { Spacer } from 'src/components';
import type { ExerciseInWorkout, SetInWorkout } from 'src/interfaces';
import MoreOptionsMenu, { type MoreOptionsMenuItem } from './more-options-menu';
import SetComponent from './set-component';

interface Props {
    exercise: ExerciseInWorkout;
    deleteExercise: (exerciseId: string) => void;
    addSet: (exerciseId: string) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
    updateSet: (
        setId: string,
        exerciseId: string,
        key: 'weight' | 'reps' | 'rpe',
        value: string
    ) => void;
}

interface IOnSwipeValueChange {
    key: string;
    value: number;
    direction: 'left' | 'right';
    isOpen: boolean;
}

const ExerciseComponent = memo(function ExerciseComponent({
    exercise,
    addSet,
    updateSet,
    deleteExercise,
    deleteSet,
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
    const renderSet = (
        { item, index }: ListRenderItemInfo<SetInWorkout>,
        rowMap: RowMap<SetInWorkout>
    ): React.ReactElement | null => (
        <SetComponent set={item} index={index} exerciseId={exercise.id} updateSet={updateSet} />
    );

    // Renders the component behind the set component (delete button)
    const renderHiddenItem = (data: ListRenderItemInfo<SetInWorkout>): React.ReactElement => (
        <View style={styles.hiddenItem}>
            <Text category='label' style={{ color: 'white' }}>
                Delete
            </Text>
        </View>
    );

    function onSwipeValueChange(swipeData: IOnSwipeValueChange): void {
        if (swipeData.value < -Dimensions.get('window').width) {
            deleteSet(exercise.id, swipeData.key);
        }
    }

    function handleDeleteExercise(): void {
        deleteExercise(exercise.id);
    }

    return (
        <View>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName} status='info' category='h6' numberOfLines={1}>
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
            <SwipeListView
                disableRightSwipe
                data={exercise.sets}
                renderItem={renderSet}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={(item) => item.id}
                onSwipeValueChange={onSwipeValueChange}
                rightOpenValue={-Dimensions.get('window').width}
                useNativeDriver={false}
                ItemSeparatorComponent={() => <Spacer size='spacing-4' />}
            />
            <Spacer size='spacing-3' />
            <Button size='tiny' appearance='outline' onPress={() => addSet(exercise.id)}>
                Add Set
            </Button>
        </View>
    );
});
export default ExerciseComponent;

const styles = StyleSheet.create({
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
