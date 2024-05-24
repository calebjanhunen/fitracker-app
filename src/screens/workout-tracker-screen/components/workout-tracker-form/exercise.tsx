import { Button, Input, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacer } from 'src/components';

export default function Exercise(): React.ReactElement {
    return (
        <View>
            <Text category='h6'>Exercise Name</Text>
            <Spacer size='spacing-2' />
            <View style={styles.set}>
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
            <View style={styles.set}>
                <Text style={styles.setNum}>1</Text>
                <Text style={styles.previous}>140x10 @ 9</Text>
                <Input keyboardType='number-pad' size='small' style={styles.weight} />
                <Input keyboardType='number-pad' size='small' style={styles.reps} />
                <Input keyboardType='number-pad' size='small' style={styles.rpe} />
            </View>
            <Spacer size='spacing-3' />
            <Button size='tiny' appearance='outline'>
                Add Set
            </Button>
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
