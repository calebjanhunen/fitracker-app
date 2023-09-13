import React, { memo, type Dispatch } from 'react';
import { FlatList } from 'react-native';

import { Button, PopupMenu, Spacer, Text } from '../../../../components';
import { type MenuOptionProps } from '../../../../components/PopupMenu/PopupMenu';
import { type Exercise } from '../../../../interfaces/Exercise';
import { ExercisesActionsTypes, type ExercisesActions } from '../../reducers/ExercisesReducer';
import WorkoutTrackerSet from '../WorkoutTrackerSet/WorkoutTrackerSet';
import {
    Body,
    ExerciseContainer,
    FlexView,
    Header,
    ReorderPressable,
    Row,
} from './WorkoutTrackerExerciseStyles';

interface ExerciseProps {
    exercise: Exercise;
    dispatchExercises: Dispatch<ExercisesActions>;
    drag: () => void;
    reorderExercises: boolean;
    isActive: boolean;
}

const WorkoutTrackerExercise = memo(function WorkoutTrackerExercise({
    exercise,
    dispatchExercises,
    drag,
    reorderExercises,
    isActive,
}: ExerciseProps): React.ReactElement {
    const menuOptions: MenuOptionProps[] = [
        { text: 'Replace Exercise', icon: 'repeat', onSelect: () => {} },
        { text: 'Delete', icon: 'trash', iconColor: 'error', onSelect: deleteExercise },
    ];
    // console.log(exercise);

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

    function reorderExercise(): void {
        if (reorderExercises) {
            drag();
        }
    }
    return (
        <ExerciseContainer>
            <Header isActive={isActive}>
                <ReorderPressable onLongPress={reorderExercise} delayLongPress={100}>
                    <Text variant='headline' color='onWhite'>
                        {exercise.name}
                    </Text>
                </ReorderPressable>
                <PopupMenu triggerIcon='ellipsis-vertical' menuOptions={menuOptions} />
            </Header>
            <Body reorderExercise={reorderExercises}>
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
                            previousSet={exercise.previousSets?.filter((_, i) => i === index)[0]}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='xxs' />}
                />
                <Spacer size='xs' />
                {!reorderExercises && (
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
                )}
            </Body>
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
