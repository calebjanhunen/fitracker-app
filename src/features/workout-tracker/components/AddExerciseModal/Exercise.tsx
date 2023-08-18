import React, { memo, type Dispatch, type SetStateAction } from 'react';

import { Spacer, Text } from '../../../../components';
import { ExerciseContainer } from './AddExerciseModalStyles';

interface Props {
    setSelectedExercises: Dispatch<SetStateAction<number[]>>;
    id: number;
    name: string;
    bodyPart: string[];
    isExerciseSelected: boolean;
}

function toggleExercise(
    setSelectedExercises: Dispatch<SetStateAction<number[]>>,
    id: number
): void {
    setSelectedExercises((prevExerciseIds) => {
        if (prevExerciseIds.includes(id)) {
            return prevExerciseIds.filter((exerciseId) => exerciseId !== id);
        } else {
            return [...prevExerciseIds, id];
        }
    });
}

const Exercise = memo(function Exercise({
    setSelectedExercises,
    id,
    name,
    bodyPart,
    isExerciseSelected,
}: Props): React.ReactElement {
    console.log(id, name, ' rendered');
    return (
        <ExerciseContainer
            onPress={() => {
                toggleExercise(setSelectedExercises, id);
            }}
            activeOpacity={1}
            backgroundColor={isExerciseSelected ? 'primaryTranslucent' : 'white'}
        >
            <Text variant='headline'>{name}</Text>
            <Spacer size='xxxs' />
            <Text variant='body' color='light'>
                {bodyPart}
            </Text>
        </ExerciseContainer>
    );
});

export default Exercise;
