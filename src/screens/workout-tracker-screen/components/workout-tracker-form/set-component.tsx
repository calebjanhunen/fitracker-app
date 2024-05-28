/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo } from 'react';

import { Input, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { type SetInWorkout } from 'src/interfaces/workout';

interface Props {
    set: SetInWorkout;
    index: number;
    exerciseId: string;
    updateSet: (
        setId: string,
        exerciseId: string,
        key: 'weight' | 'reps' | 'rpe',
        value: string
    ) => void;
}

const SetComponent = memo(function SetComponent({
    set,
    index,
    exerciseId,
    updateSet,
}: Props): React.ReactElement {
    return (
        <View style={styles.visibleSetStyles}>
            <Text style={styles.setNum}>{index + 1}</Text>
            <Text style={styles.previous} numberOfLines={1}>
                {set.id}
            </Text>
            <Input
                onChangeText={(text) => updateSet(set.id, exerciseId, 'weight', text)}
                keyboardType='number-pad'
                size='small'
                style={styles.inputBox}
            />
            <Input
                onChangeText={(text) => updateSet(set.id, exerciseId, 'reps', text)}
                keyboardType='number-pad'
                size='small'
                style={styles.inputBox}
            />
            <Input
                onChangeText={(text) => updateSet(set.id, exerciseId, 'rpe', text)}
                keyboardType='number-pad'
                size='small'
                style={styles.inputBox}
            />
        </View>
    );
});

export default SetComponent;

const styles = StyleSheet.create({
    visibleSetStyles: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        backgroundColor: 'white',
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
    inputBox: {
        flex: 1,
        textAlign: 'center',
    },
});
