import React, { memo, useEffect, useRef, useState, type Dispatch } from 'react';
import { Dimensions, type Animated } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';

import { AnimatedText, Text, TextInput } from '../../../../components';
import { type ExerciseSet, type PreviousSet } from '../../../../interfaces/Exercise';
import { ExercisesActionsTypes, type ExercisesActions } from '../../reducers/ExercisesReducer';
import { DeleteSetContainer, ExerciseSetContainer, FlexView, Row } from './WorkoutTrackerSetStyles';

interface Props {
    set: ExerciseSet;
    previousSet: PreviousSet | undefined;
    setIndex: number;
    exerciseId: number;
    dispatchExercises: Dispatch<ExercisesActions>;
}

function rightActions(
    progress: ReturnType<Animated.Value['interpolate']>,
    dragX: ReturnType<Animated.Value['interpolate']>,
    deleteTextWidth: React.MutableRefObject<number>
): React.ReactElement {
    // For text in middle of screen: [(width of window) / 2 - (width of text)] (moves right side of text to the middle)
    const middleOfScreen = Dimensions.get('window').width / 2 - deleteTextWidth.current;

    // For text at edge of screen: [(width of window) - (width of text) * 2 - (screen padding)] --> (why *2 ? idk it worked)
    const edgeOfScreen = Dimensions.get('window').width - deleteTextWidth.current * 2 - 16;

    const xPos = progress.interpolate({
        inputRange: [0, 0.2, 0.53, 0.57, 1],
        outputRange: [60, 0, 0, -middleOfScreen, -edgeOfScreen],
        extrapolateRight: 'clamp',
    });
    return (
        <DeleteSetContainer>
            <AnimatedText textWidth={deleteTextWidth} animatedValue={xPos}>
                Delete
            </AnimatedText>
        </DeleteSetContainer>
    );
}

const WorkoutTrackerSet = memo(function WorkoutTrackerSet({
    set,
    setIndex,
    exerciseId,
    dispatchExercises,
    previousSet,
}: Props): React.ReactElement {
    const deleteTextWidth = useRef<number>(0);
    const swipeableRef = useRef<Swipeable>(null);
    const [weight, setWeight] = useState<number>();
    const [reps, setReps] = useState<number>();

    useEffect(() => {
        if (weight && reps) {
            dispatchExercises({
                type: ExercisesActionsTypes.VALIDATE_SET,
                payload: { exerciseId, setId: set.id, valid: true },
            });
        } else {
            dispatchExercises({
                type: ExercisesActionsTypes.VALIDATE_SET,
                payload: { exerciseId, setId: set.id, valid: false },
            });
        }
    }, [weight, reps]);

    function updateWeight(weightText: string): void {
        const weightVal = Number(weightText);
        setWeight(weightVal);
        dispatchExercises({
            type: ExercisesActionsTypes.UPDATE_SET_WEIGHT,
            payload: { exerciseId, setId: set.id, weight: weightVal },
        });
    }

    function updateReps(repText: string): void {
        const repVal = Number(repText);
        setReps(repVal);
        dispatchExercises({
            type: ExercisesActionsTypes.UPDATE_SET_REPS,
            payload: { exerciseId, setId: set.id, reps: repVal },
        });
    }

    function deleteSet(): void {
        dispatchExercises({
            type: ExercisesActionsTypes.DELETE_SET,
            payload: { exerciseId, setId: set.id },
        });
        swipeableRef?.current?.close();
    }

    return (
        <Swipeable
            renderRightActions={(process, dragX) => rightActions(process, dragX, deleteTextWidth)}
            onSwipeableOpen={deleteSet}
            ref={swipeableRef}
        >
            <ExerciseSetContainer>
                <Row>
                    <FlexView flex={0.5}>
                        <Text variant='body' color='primary'>
                            {setIndex + 1}
                        </Text>
                    </FlexView>
                    <FlexView flex={2}>
                        <Text variant='body' color='light'>
                            {previousSet ? `${previousSet.weight} x ${previousSet.reps} ` : ' '}
                        </Text>
                    </FlexView>
                    <FlexView flex={1}>
                        <TextInput
                            variant='body'
                            inputMode='numeric'
                            textAlign='center'
                            maxLength={4}
                            onChangeText={updateWeight}
                        />
                    </FlexView>
                    <FlexView flex={1}>
                        <TextInput
                            variant='body'
                            inputMode='numeric'
                            textAlign='center'
                            maxLength={4}
                            onChangeText={updateReps}
                        />
                    </FlexView>
                </Row>
            </ExerciseSetContainer>
        </Swipeable>
    );
});

export default WorkoutTrackerSet;
