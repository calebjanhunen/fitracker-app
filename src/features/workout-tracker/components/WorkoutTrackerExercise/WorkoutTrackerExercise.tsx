import React, { memo, type Dispatch } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { Button, Spacer, Text } from '../../../../components';
import { type Exercise } from '../../../../interfaces/Exercise';
import { ExercisesActionsTypes, type ExercisesActions } from '../../reducers/ExercisesReducer';
import WorkoutTrackerSet from '../WorkoutTrackerSet/WorkoutTrackerSet';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
    dispatchExercises: Dispatch<ExercisesActions>;
}

const WorkoutTrackerExercise = memo(function WorkoutTrackerExercise({
    exercise,
    dispatchExercises,
}: ExerciseProps): React.ReactElement {
    function addSet(): void {
        dispatchExercises({
            type: ExercisesActionsTypes.ADD_SET,
            payload: { exerciseId: exercise.id },
        });
    }

    function deleteExercise(): void {
        dispatchExercises({
            type: ExercisesActionsTypes.DELETE_EXERCISE,
            payload: { id: exercise.id },
        });
    }

    return (
        <ExerciseContainer>
            <Row>
                <Text variant='headline' color='onWhite'>
                    {exercise.name}
                </Text>
                <TouchableOpacity onPress={deleteExercise}>
                    <Icon name='trash-outline' size={24} />
                </TouchableOpacity>
            </Row>
            <Spacer size='xs' />
            <FlatList
                data={exercise.sets}
                ListHeaderComponent={ExerciseSetHeader}
                renderItem={({ item, index }) => (
                    <WorkoutTrackerSet
                        set={item}
                        setIndex={index}
                        exerciseId={exercise.id}
                        dispatchExercises={dispatchExercises}
                    />
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
                onPress={addSet}
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
