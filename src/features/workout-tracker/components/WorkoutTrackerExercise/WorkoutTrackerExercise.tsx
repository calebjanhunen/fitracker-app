import React, { useReducer, type Dispatch } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import uuid from 'react-native-uuid';

import { Button, Spacer, Text } from '../../../../components';
import { type Exercise, type ExerciseSet } from '../../../../interfaces/Exercise';
import { type ExercisesActions } from '../../screens/WorkoutTrackerModal/WorkoutTrackerModal';
import ExerciseSetComponent from './ExerciseSetComponent';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
    dispatchExercises: Dispatch<ExercisesActions>;
}

export interface ExerciseSetsActions {
    type: string;
    payload?: {
        id: string | number[];
        weight?: number;
        reps?: number;
        rpe?: number;
    };
}

function deleteExercise(
    dispatchExercises: Dispatch<ExercisesActions>,
    exerciseId: string | number[]
): void {
    dispatchExercises({ type: 'delete-exercise', payload: exerciseId });
}

function exerciseSetsReducer(
    exerciseSets: ExerciseSet[],
    action: ExerciseSetsActions
): ExerciseSet[] {
    switch (action.type) {
        case 'add-set':
            return [
                ...exerciseSets,
                { id: uuid.v4(), reps: null, weight: null, rpe: null, previous: null },
            ];
        case 'delete-set':
            return exerciseSets.filter((set) => set.id !== action.payload?.id);
        default:
            return exerciseSets;
    }
}

export default function WorkoutTrackerExercise({
    exercise,
    dispatchExercises,
}: ExerciseProps): React.ReactElement {
    const [exerciseSets, dispatchSets] = useReducer(exerciseSetsReducer, [
        {
            id: uuid.v4(),
            reps: null,
            weight: null,
            rpe: null,
            previous: null,
        },
    ]);

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
                    dispatchSets({ type: 'add-set' });
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
