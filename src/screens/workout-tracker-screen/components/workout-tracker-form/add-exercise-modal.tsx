/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { type Dispatch, type SetStateAction } from 'react';

import { Card, Input, List, Modal, Text, useTheme } from '@ui-kitten/components';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Spacer } from 'src/components';
import { type ExerciseInWorkout } from 'src/interfaces';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    addExercises: (exercises: ExerciseInWorkout[]) => void;
}

export default function AddExerciseModal({
    visible,
    setVisible,
    addExercises,
}: Props): React.ReactElement {
    const theme = useTheme();
    const renderExercise = (): React.ReactElement => (
        <TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                }}
            >
                <View>
                    <Text category='h6'>Exercise Name</Text>
                    <Spacer size='spacing-2' />
                    <Text category='label' appearance='hint'>
                        Body Part
                    </Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Text appearance='hint' category='s1'>
                        20
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card
                style={{
                    width: Dimensions.get('window').width - 32,
                    height: Dimensions.get('window').height - 200,
                }}
                disabled={true}
            >
                <Input size='large' placeholder='Search for exercise...' />
                <Spacer size='spacing-8' />
                <List
                    data={[0, 0, 0]}
                    renderItem={renderExercise}
                    style={{ backgroundColor: 'transparent' }}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                backgroundColor: theme['color-basic-500'],
                            }}
                        />
                    )}
                />
            </Card>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
