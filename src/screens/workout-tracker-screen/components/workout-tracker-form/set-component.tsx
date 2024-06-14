/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo, useRef } from 'react';

import { Input, Text } from '@ui-kitten/components';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { type SetInWorkout } from 'src/interfaces/workout';

interface Props {
    set: SetInWorkout;
    setOrder: number;
    exerciseId: string;
    updateSet: (
        setId: string,
        exerciseId: string,
        key: 'weight' | 'reps' | 'rpe',
        value: string
    ) => void;
    deleteSet: (exerciseId: string, setId: string) => void;
}

const screenWidth = Dimensions.get('window').width;

const SetComponent = memo(function SetComponent({
    set,
    setOrder,
    exerciseId,
    updateSet,
    deleteSet,
}: Props): React.ReactElement {
    const heightAnim = useRef(new Animated.Value(41)).current;

    function renderRightActions(
        progress: ReturnType<Animated.Value['interpolate']>,
        dragX: ReturnType<Animated.Value['interpolate']>
    ): React.ReactElement {
        const scale = dragX.interpolate({
            inputRange: [-screenWidth / 2, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={[styles.rightAction]}>
                <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
                    Delete
                </Animated.Text>
            </Animated.View>
        );
    }

    function onDeleteSet(): void {
        Animated.timing(heightAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            deleteSet(exerciseId, set.id);
        });
    }

    return (
        <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onDeleteSet}>
            <Animated.View style={[styles.visibleSetStyles, { height: heightAnim }]}>
                <Text style={styles.setNum}>{setOrder}</Text>
                <Text style={styles.previous} numberOfLines={1}>
                    {set.id}
                </Text>
                <Input
                    onChangeText={(text) => updateSet(exerciseId, set.id, 'weight', text)}
                    keyboardType='number-pad'
                    size='small'
                    style={styles.inputBox}
                    value={set.weight > 0 ? set.weight.toString() : ''}
                    maxLength={4}
                    textStyle={{ marginHorizontal: 0, textAlign: 'center' }}
                />
                <Input
                    onChangeText={(text) => updateSet(exerciseId, set.id, 'reps', text)}
                    keyboardType='number-pad'
                    size='small'
                    style={styles.inputBox}
                    value={set.reps > 0 ? set.reps.toString() : ''}
                    maxLength={4}
                    textStyle={{ marginHorizontal: 0, textAlign: 'center' }}
                />
                <Input
                    onChangeText={(text) => updateSet(exerciseId, set.id, 'rpe', text)}
                    keyboardType='number-pad'
                    size='small'
                    style={styles.rpeInput}
                    value={set.rpe > 0 ? set.rpe.toString() : ''}
                    maxLength={2}
                    textStyle={{ marginHorizontal: 0, textAlign: 'center' }}
                />
            </Animated.View>
        </Swipeable>
    );
});

export default SetComponent;

const styles = StyleSheet.create({
    visibleSetStyles: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    setNum: {
        flex: 0.5,
        textAlign: 'center',
    },
    previous: {
        flex: 2,
        textAlign: 'center',
    },
    inputBox: {
        flex: 1,
        textAlign: 'center',
    },
    rpeInput: {
        flex: 0.7,
        textAlign: 'center',
    },
    rightAction: {
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 8,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        // transform: [{ translateX: -screenWidth / 2 }],
    },
});
