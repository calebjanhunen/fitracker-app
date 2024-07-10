/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Button, Text } from '@ui-kitten/components';
import React, { type Dispatch, type SetStateAction } from 'react';
import { View } from 'react-native';
import { Spacer } from 'src/components';

interface Props {
    exerciseName: string;
    setCreateExerciseModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function NoExercisesDisplay({
    exerciseName,
    setCreateExerciseModalVisible,
}: Props): React.ReactElement {
    return (
        <View style={{ alignItems: 'center', paddingTop: 12 }}>
            <Text category='h6'>&quot;{exerciseName}&quot; not found</Text>
            <Spacer size='spacing-4' />
            <Button appearance='outline' onPress={() => setCreateExerciseModalVisible(true)}>
                Create new Exercise
            </Button>
        </View>
    );
}
