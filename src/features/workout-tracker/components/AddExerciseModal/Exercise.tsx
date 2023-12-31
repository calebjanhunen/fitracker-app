import React, { memo, type Dispatch, type SetStateAction } from 'react';

import { Spacer, Text } from '../../../../components';
import { type Exercise as ExerciseInterface } from '../../../../interfaces/Exercise';
import { ExerciseContainer } from './AddExerciseModalStyles';

interface Props {
    setSelectedExercises: Dispatch<SetStateAction<ExerciseInterface[]>>;
    id: number;
    name: string;
    bodyPart: string[];
    isExerciseSelected: boolean;
    workoutExercises: ExerciseInterface[];
}

function toggleExercise(
    setSelectedExercises: Dispatch<SetStateAction<ExerciseInterface[]>>,
    id: number,
    name: string
): void {
    setSelectedExercises((prevExercises) => {
        if (prevExercises.find((prevExercise) => prevExercise.id === id)) {
            return prevExercises.filter((prevExercise) => prevExercise.id !== id);
        } else {
            return [...prevExercises, { id, name, sets: [], valid: true }];
        }
    });
}

const Exercise = memo(function Exercise({
    setSelectedExercises,
    id,
    name,
    bodyPart,
    isExerciseSelected,
    workoutExercises,
}: Props): React.ReactElement {
    return (
        <ExerciseContainer
            onPress={() => {
                toggleExercise(setSelectedExercises, id, name);
            }}
            activeOpacity={1}
            backgroundColor={isExerciseSelected ? 'primaryTranslucent' : 'white'}
            disabled={Boolean(workoutExercises.find((exercise) => exercise.id === id))}
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
