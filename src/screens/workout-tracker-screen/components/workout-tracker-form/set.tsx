import { Input, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Set(): React.ReactElement {
    return (
        <View style={styles.set}>
            <Text style={styles.setNum}>1</Text>
            <Text style={styles.previous}>140x10 @ 9</Text>
            <Input keyboardType='number-pad' size='small' style={styles.weight} />
            <Input keyboardType='number-pad' size='small' style={styles.reps} />
            <Input keyboardType='number-pad' size='small' style={styles.rpe} />
        </View>
    );
}

const styles = StyleSheet.create({
    set: {
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
