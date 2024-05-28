/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo, useState, type Dispatch } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Button, Text } from '@ui-kitten/components';
import { Dimensions, StyleSheet, View, type ListRenderItemInfo } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { SwipeListView, SwipeRow, type RowMap } from 'react-native-swipe-list-view';

import { Spacer } from 'src/components';
import { type ExerciseInWorkout, type SetInWorkout } from 'src/interfaces/workout';
import {
    WorkoutFormActionTypes,
    type WorkoutFormActions,
} from 'src/state/reducers/workout-form-reducer';
import SetComponent from './set-component';

interface Props {
    exercise: ExerciseInWorkout;
    dispatchExercises: Dispatch<WorkoutFormActions>;
}

interface IOnSwipeValueChange {
    key: string;
    value: number;
    direction: 'left' | 'right';
    isOpen: boolean;
}

const ExerciseComponent = memo(function ExerciseComponent({
    exercise,
    dispatchExercises,
}: Props): React.ReactElement {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [setToDelete, setSetToDelete] = useState<string | null>(null);
    const renderSet = (
        { item, index }: ListRenderItemInfo<SetInWorkout>,
        rowMap: RowMap<SetInWorkout>
    ): React.ReactElement | null => (
        <SetComponent
            set={item}
            index={index}
            exerciseId={exercise.id}
            dispatchExercises={dispatchExercises}
            isDeleting={isDeleting}
            setToDelete={setToDelete}
            deleteSet={deleteSet}
        />
    );

    // Renders the component behind the set component (delete button)
    const renderHiddenItem = (data: ListRenderItemInfo<SetInWorkout>): React.ReactElement => (
        <View
            style={{
                backgroundColor: 'red',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 16,
                justifyContent: 'flex-end',
                height: 35,
            }}
        >
            <Text category='label' style={{ color: 'white' }}>
                Delete
            </Text>
        </View>
    );

    function deleteExercise(): void {
        dispatchExercises({ type: WorkoutFormActionTypes.DELETE_EXERCISE, payload: exercise.id });
    }

    function addSet(): void {
        dispatchExercises({ type: WorkoutFormActionTypes.ADD_SET, payload: exercise.id });
    }

    function deleteSet(setId: string): void {
        dispatchExercises({
            type: WorkoutFormActionTypes.DELETE_SET,
            exerciseId: exercise.id,
            setId,
        });
        setIsDeleting(false);
        setSetToDelete(null);
    }

    function onSwipeValueChange(swipeData: IOnSwipeValueChange): void {
        if (swipeData.value < -Dimensions.get('window').width) {
            setSetToDelete(swipeData.key);
            setIsDeleting(true);
        }
    }

    return (
        <View>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName} category='h6' numberOfLines={1}>
                    {exercise.name}
                </Text>
                <Menu>
                    <MenuTrigger>
                        <FontAwesome size={24} name='ellipsis-v' />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption
                            onSelect={deleteExercise}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <Text>Delete</Text>
                            <FontAwesome size={16} name='trash' />
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
            <Spacer size='spacing-2' />
            <View style={styles.setHeader}>
                <Text category='label' style={styles.setNum}>
                    Set
                </Text>
                <Text category='label' style={styles.previous}>
                    Previous
                </Text>
                <Text category='label' style={styles.weight}>
                    Weight
                </Text>
                <Text category='label' style={styles.reps}>
                    Reps
                </Text>
                <Text category='label' style={styles.rpe}>
                    RPE
                </Text>
            </View>
            <Spacer size='spacing-1' />
            <SwipeListView
                disableRightSwipe
                data={exercise.sets}
                renderItem={renderSet}
                renderHiddenItem={renderHiddenItem}
                keyExtractor={(item) => item.id}
                onSwipeValueChange={onSwipeValueChange}
                rightOpenValue={-Dimensions.get('window').width}
                useNativeDriver={false}
            />
            <Spacer size='spacing-3' />
            <Button size='tiny' appearance='outline' onPress={addSet}>
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
    weight: {
        flex: 1.5,
        textAlign: 'center',
    },
    reps: {
        flex: 1.5,
        textAlign: 'center',
    },
    rpe: {
        flex: 0.8,
        textAlign: 'center',
    },
});
