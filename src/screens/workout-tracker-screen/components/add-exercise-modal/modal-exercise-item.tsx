import React, { memo } from 'react';

import { Text } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';
import { Spacer } from 'src/components';

import type { Exercise } from 'src/interfaces';

interface Props {
    exercise: Exercise;
}

const ModalExerciseItem = memo(function ModalExerciseItem({ exercise }: Props): React.ReactElement {
    return (
        <TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                }}
            >
                <View>
                    <Text category='h6'>{exercise.name}</Text>
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
});

export default ModalExerciseItem;
