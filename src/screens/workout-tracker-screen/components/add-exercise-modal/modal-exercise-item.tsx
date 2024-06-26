/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo } from 'react';

import { Text, useTheme } from '@ui-kitten/components';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Spacer } from 'src/components';
import type { ExerciseForWorkout } from 'src/interfaces';

interface Props {
    exercise: ExerciseForWorkout;
    isExerciseSelected: boolean;
    toggleExercise: (exercise: ExerciseForWorkout) => void;
    disabled: boolean;
}

const ModalExerciseItem = memo(function ModalExerciseItem({
    exercise,
    isExerciseSelected,
    toggleExercise,
    disabled,
}: Props): React.ReactElement {
    const theme = useTheme();
    return (
        <TouchableWithoutFeedback onPress={() => toggleExercise(exercise)} disabled={disabled}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    backgroundColor: isExerciseSelected
                        ? theme['color-primary-transparent-200']
                        : disabled
                        ? theme['color-primary-disabled']
                        : 'transparent',
                }}
            >
                <View>
                    <Text category='h6'>{exercise.name}</Text>
                    <Spacer size='spacing-2' />
                    <Text category='label' appearance='hint'>
                        {exercise.primaryMuscle}
                    </Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <Text appearance='hint' category='s1'>
                        {exercise.numTimesUsed}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default ModalExerciseItem;
