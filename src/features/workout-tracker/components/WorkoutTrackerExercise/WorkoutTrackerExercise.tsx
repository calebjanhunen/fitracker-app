import React, { memo, useEffect, useReducer, type Dispatch } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Button, Spacer, Text } from '../../../../components';
import { useWorkoutExercises } from '../../../../hooks/useWorkoutExercises';
import { type Exercise } from '../../../../interfaces/Exercise';
import {
    ExerciseSetsActionsTypes,
    exerciseSetsReducer,
    type ExerciseSetsActions,
} from '../../reducers/ExerciseSetsReducer';
import WorkoutTrackerSet from '../WorkoutTrackerSet/WorkoutTrackerSet';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
}

function initializeSets(exercise: Exercise, dispatchSets: Dispatch<ExerciseSetsActions>): void {
    for (let i = 0; i < exercise.numSets; i++) {
        dispatchSets({ type: ExerciseSetsActionsTypes.ADD_SET });
    }
}

const WorkoutTrackerExercise = memo(function WorkoutTrackerExercise({
    exercise,
}: ExerciseProps): React.ReactElement {
    const { deleteExercise } = useWorkoutExercises();
    const [exerciseSets, dispatchSets] = useReducer(exerciseSetsReducer, []);
    useEffect(() => {
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
                        deleteExercise(exercise.id);
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
                    <WorkoutTrackerSet set={item} setIndex={index} dispatchSets={dispatchSets} />
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
});

export default WorkoutTrackerExercise;

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
