import React, { useState, type Dispatch, type SetStateAction } from 'react';

import { FlatList, TouchableOpacity } from 'react-native';
import { BottomMenu, Button, Spacer, Text } from '../../../../components';
import { type Exercise } from '../../../../interfaces/Exercise';
import ExerciseSetComponent from './ExerciseSetComponent';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
    exerciseIndex: number;
    allExercises: Exercise[];
    setExercises: Dispatch<SetStateAction<Exercise[]>>;
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
    const [moreOptionsMenuVisible, setMoreOptionsMenuVisible] = useState<boolean>(false);

    function deleteExercise(): void {
        const newExercises = allExercises.filter((e) => e.id !== exercise.id);

        setExercises(newExercises);
    }

    return (
        <ExerciseContainer>
            {/* Bottom More options Menu */}
            <BottomMenu
                moreOptionsVisible={moreOptionsMenuVisible}
                setMoreOptionsVisible={setMoreOptionsMenuVisible}
                menuItemProps={[
                    { icon: 'trash-outline', text: 'Delete Exercise', onPress: deleteExercise },
                ]}
            />
            {/* Exercise */}
            <Row>
                <Text variant='headline' color='onWhite'>
                    {exercise.name}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setMoreOptionsMenuVisible(true);
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
                renderItem={({ item, index }) => (
                    <ExerciseSetComponent
                        set={item}
                        setIndex={index}
                        setExercises={setExercises}
                        exercise={exercise}
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
