import React, { type Dispatch, type SetStateAction } from 'react';

import { Button, Spacer, Text, TextInput } from '../../../../components';

import { FlatList, TouchableOpacity } from 'react-native';
import { type Exercise, type ExerciseSet } from '../../../../interfaces/Exercise';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
    exerciseIndex: number;
    allExercises: Exercise[];
    setExercises: Dispatch<SetStateAction<Exercise[]>>;
}

interface ExerciseSetProps {
    set: ExerciseSet;
    index: number;
}

function addExerciseSet(
    exercise: Exercise,
    exerciseIndex: number,
    setExercises: Dispatch<SetStateAction<Exercise[]>>
): void {
    setExercises((prevExercises) => {
        // console.log(prevExercises[exerciseIndex]);
        prevExercises[exerciseIndex].sets.push({
            previous: null,
            reps: null,
            weight: null,
            rpe: null,
        });
        // console.log(prevExercises[exerciseIndex]);
        return [...prevExercises];
    });
}

export default function WorkoutTrackerExercise({
    exercise,
    exerciseIndex,
    allExercises,
    setExercises,
}: ExerciseProps): React.ReactElement {
    // console.log(exercise);
    return (
        <ExerciseContainer>
            <Row>
                <Text variant='headline' color='onWhite'>
                    {exercise.name}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        // TODO: Open modal (idk what will be displayed)
                    }}
                >
                    <Icon name='ellipsis-horizontal' size={34} />
                </TouchableOpacity>
            </Row>
            <Spacer size='xs' />
            <FlatList
                data={exercise.sets}
                extraData={allExercises}
                ListHeaderComponent={ExerciseSetHeader}
                renderItem={({ item, index }) => <ExerciseSetComponent set={item} index={index} />}
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
                    addExerciseSet(exercise, exerciseIndex, setExercises);
                }}
            >
                Add Set
            </Button>
        </ExerciseContainer>
    );
}

function ExerciseSetHeader(): React.ReactElement {
    return (
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
    );
}

function ExerciseSetComponent({ set, index }: ExerciseSetProps): React.ReactElement {
    return (
        <Row>
            <FlexView flex={0.5}>
                <Text variant='body' color='primary'>
                    {index + 1}
                </Text>
            </FlexView>
            <FlexView flex={2}>
                <Text variant='body' color='light'>
                    {set.previous
                        ? `${set.previous?.reps} x ${set.previous?.weight} @ ${set.previous?.rpe}`
                        : ''}
                </Text>
            </FlexView>
            <FlexView flex={1}>
                <TextInput variant='body' inputMode='numeric' textAlign='center' maxLength={4} />
            </FlexView>
            <FlexView flex={1}>
                <TextInput variant='body' inputMode='numeric' textAlign='center' maxLength={4} />
            </FlexView>
        </Row>
    );
}
