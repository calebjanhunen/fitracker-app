import React, { useEffect, useReducer, type Dispatch } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Button, Spacer, Text } from '../../../../components';
import { type Exercise } from '../../../../interfaces/Exercise';
import {
    ExerciseSetsActionsTypes,
    exerciseSetsReducer,
    type ExerciseSetsActions,
} from '../../reducers/ExerciseSetsReducer';
import { ExercisesActionsTypes, type ExercisesActions } from '../../reducers/ExercisesReducer';
import ExerciseSetComponent from './ExerciseSetComponent';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
    dispatchExercises: Dispatch<ExercisesActions>;
}

function deleteExercise(
    dispatchExercises: Dispatch<ExercisesActions>,
    exerciseId: string | number[]
): void {
    dispatchExercises({ type: ExercisesActionsTypes.DELETE_EXERCISE, payload: { id: exerciseId } });
}

function initializeSets(exercise: Exercise, dispatchSets: Dispatch<ExerciseSetsActions>): void {
    for (let i = 0; i < exercise.numSets; i++) {
        dispatchSets({ type: ExerciseSetsActionsTypes.ADD_SET });
    }
}

export default function WorkoutTrackerExercise({
    exercise,
    dispatchExercises,
}: ExerciseProps): React.ReactElement {
    const [exerciseSets, dispatchSets] = useReducer(exerciseSetsReducer, []);
    useEffect(() => {
        console.log('exercise rendered: ', exercise.id);
        initializeSets(exercise, dispatchSets);
    }, []);

    return (
        <ExerciseContainer>
            {/* Exercise */}
            <Row>
                <Text variant='headline' color='onWhite'>
                    {exercise.name}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        deleteExercise(dispatchExercises, exercise.id);
                    }}
                >
                    <Icon name='trash-outline' size={24} />
                </TouchableOpacity>
            </Row>
            <Spacer size='xs' />
            <FlatList
                data={exerciseSets}
                ListHeaderComponent={ExerciseSetHeader}
                renderItem={({ item, index }) => (
                    <ExerciseSetComponent set={item} setIndex={index} dispatchSets={dispatchSets} />
                )}
                ItemSeparatorComponent={() => <Spacer size='xxs' />}
            />
            <Spacer size='xs' />
            <Button
                variant='full'
                backgroundColor='white'
                textColor='light'
                borderColor='primary'
                thin
                onPress={() => {
                    dispatchSets({ type: ExerciseSetsActionsTypes.ADD_SET });
                }}
            >
                Add Set
            </Button>
        </ExerciseContainer>
    );
}

function ExerciseSetHeader(): React.ReactElement {
    return (
        <>
            <Row>
                <FlexView flex={0.5}>
                    <Text variant='headline' color='primary'>
                        Set
                    </Text>
                </FlexView>
                <FlexView flex={2}>
                    <Text variant='headline' color='primary'>
                        Previous
                    </Text>
                </FlexView>
                <FlexView flex={1}>
                    <Text variant='headline' color='primary'>
                        lbs
                    </Text>
                </FlexView>
                <FlexView flex={1}>
                    <Text variant='headline' color='primary'>
                        Reps
                    </Text>
                </FlexView>
            </Row>
            <Spacer size='xxs' />
        </>
    );
}
