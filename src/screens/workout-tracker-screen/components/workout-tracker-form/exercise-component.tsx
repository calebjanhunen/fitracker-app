/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Spacer } from 'src/components';
import { type Exercise } from 'src/interfaces/exercise';
import Set from './set';

interface Props {
    exercise: Exercise;
}

export default function ExerciseComponent({ exercise }: Props): React.ReactElement {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const menuButton = (): React.ReactElement => (
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons size={24} name='ellipsis-vertical' />
        </TouchableOpacity>
    );

    function deleteExercise(): void {}

    return (
        <View>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName} category='h6' numberOfLines={1}>
                    {exercise.name}
                </Text>
                <OverflowMenu
                    anchor={menuButton}
                    visible={menuVisible}
                    onBackdropPress={() => setMenuVisible(false)}
                >
                    <MenuItem
                        title='Delete'
                        accessoryRight={() => <Ionicons name='trash' />}
                        onPress={deleteExercise}
                    />
                </OverflowMenu>
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
            <Set />
            <Spacer size='spacing-3' />
            <Button size='tiny' appearance='outline'>
                Add Set
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    exerciseName: {
        flex: 1,
    },
    setHeader: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
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
