import React, { type Dispatch, type SetStateAction } from 'react';

import { Spacer, Text } from '../../../../components';
import { ExerciseContainer } from './AddExerciseModalStyles';

interface Props {
    selectedExercises: number[];
    setSelectedExercises: Dispatch<SetStateAction<number[]>>;
    id: number;
}

function toggleExercise(
    selectedExercises: number[],
    setSelectedExercises: Dispatch<SetStateAction<number[]>>,
    id: number
): void {
    let newSelectedExercises = [...selectedExercises];

    if (selectedExercises.includes(id)) {
        newSelectedExercises = newSelectedExercises.filter((exerciseId) => exerciseId !== id);
    } else {
        newSelectedExercises.push(id);
    }

    setSelectedExercises(newSelectedExercises);
}

export default function Exercise({
    selectedExercises,
    setSelectedExercises,
    id,
}: Props): React.ReactElement {
    const isExerciseSelected = selectedExercises.includes(id);
    return (
        <ExerciseContainer
            onPress={() => {
                toggleExercise(selectedExercises, setSelectedExercises, id);
            }}
            activeOpacity={1}
            backgroundColor={isExerciseSelected ? 'primaryTranslucent' : 'white'}
        >
            <Text variant='headline'>Exercise Name</Text>
            <Spacer size='xxxs' />
            <Text variant='body' color='light'>
                Body Part
            </Text>
        </ExerciseContainer>
    );
}
