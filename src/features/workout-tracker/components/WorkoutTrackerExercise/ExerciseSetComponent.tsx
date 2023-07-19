import React, {
    MutableRefObject,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Dimensions, type Animated, type LayoutChangeEvent, type Text } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';

import { AnimatedText, Text as CustomText, TextInput } from '../../../../components';
import { type Exercise, type ExerciseSet } from '../../../../interfaces/Exercise';
import {
    DeleteSetContainer,
    DeleteSetText,
    ExerciseSetContainer,
    FlexView,
    Row,
} from './WorkoutTrackerExerciseStyles';

interface Props {
    set: ExerciseSet;
    setIndex: number;
    exercise: Exercise;
    setExercises: Dispatch<SetStateAction<Exercise[]>>;
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

function deleteSet(
    exercise: Exercise,
    setIndex: number,
    setExercises: Dispatch<SetStateAction<Exercise[]>>,
    swipeableRef: React.RefObject<Swipeable>
): void {
    // Filter set to delete from array of sets
    const newSets = exercise.sets.filter((set, index) => index !== setIndex);

    // Assign the newSets variable with the filtered out set to the exercise set property
    const newExercise = { ...exercise, sets: newSets };

    // Map the new exercise to the current exercise with the filtered out set
    setExercises((prevExercises) =>
        prevExercises.map((exerc) => (exerc.id === newExercise.id ? newExercise : exerc))
    );
    // Close the swipeable component
    // swipeableRef?.current?.openRight();
}

export default function ExerciseSetComponent({
    set,
    setIndex,
    setExercises,
    exercise,
}: Props): React.ReactElement {
    const deleteTextWidth = useRef<number>(0);
    const swipeableRef = useRef<Swipeable>(null);

    return (
        <Swipeable
            renderRightActions={(process, dragX) => rightActions(process, dragX, deleteTextWidth)}
            onSwipeableOpen={() => {
                deleteSet(exercise, setIndex, setExercises, swipeableRef);
            }}
            ref={swipeableRef}
        >
            <ExerciseSetContainer>
                <Row>
                    <FlexView flex={0.5}>
                        <CustomText variant='body' color='primary'>
                            {setIndex + 1}
                        </CustomText>
                    </FlexView>
                    <FlexView flex={2}>
                        <CustomText variant='body' color='light'>
                            {set.previous
                                ? `${set.previous?.reps} x ${set.previous?.weight} @ ${set.previous?.rpe}`
                                : ''}
                        </CustomText>
                    </FlexView>
                    <FlexView flex={1}>
                        <TextInput
                            variant='body'
                            inputMode='numeric'
                            textAlign='center'
                            maxLength={4}
                            value={set.weight?.toString()}
                        />
                    </FlexView>
                    <FlexView flex={1}>
                        <TextInput
                            variant='body'
                            inputMode='numeric'
                            textAlign='center'
                            maxLength={4}
                            value={set.reps?.toString()}
                        />
                    </FlexView>
                </Row>
            </ExerciseSetContainer>
        </Swipeable>
    );
}
