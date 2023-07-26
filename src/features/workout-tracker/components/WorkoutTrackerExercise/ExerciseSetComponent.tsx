import React, { useRef, useState, type Dispatch } from 'react';
import { Dimensions, type Animated } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';

import { AnimatedText, Text as CustomText, TextInput } from '../../../../components';
import { type ExerciseSet } from '../../../../interfaces/Exercise';
import { type ExerciseSetsActions } from './WorkoutTrackerExercise';
import {
    DeleteSetContainer,
    ExerciseSetContainer,
    FlexView,
    Row,
} from './WorkoutTrackerExerciseStyles';

interface Props {
    set: ExerciseSet;
    setIndex: number;
    dispatchSets: Dispatch<ExerciseSetsActions>;
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
    set: ExerciseSet,
    dispatchSets: Dispatch<ExerciseSetsActions>,
    swipeableRef: React.RefObject<Swipeable>
): void {
    dispatchSets({ type: 'delete-set', payload: { id: set.id } });
    swipeableRef?.current?.close();
}

export default function ExerciseSetComponent({
    set,
    setIndex,
    dispatchSets,
}: Props): React.ReactElement {
    const deleteTextWidth = useRef<number>(0);
    const swipeableRef = useRef<Swipeable>(null);
    const [weight, setWeight] = useState<number>();
    const [reps, setReps] = useState<number>();

    return (
        <Swipeable
            renderRightActions={(process, dragX) => rightActions(process, dragX, deleteTextWidth)}
            onSwipeableOpen={() => {
                deleteSet(set, dispatchSets, swipeableRef);
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
                                : `${set.id.toString().slice(0, 8)}`}
                        </CustomText>
                    </FlexView>
                    <FlexView flex={1}>
                        <TextInput
                            variant='body'
                            inputMode='numeric'
                            textAlign='center'
                            maxLength={4}
                            value={weight?.toString() ?? ''}
                            onChangeText={(text) => {
                                setWeight(Number(text));
                            }}
                        />
                    </FlexView>
                    <FlexView flex={1}>
                        <TextInput
                            variant='body'
                            inputMode='numeric'
                            textAlign='center'
                            maxLength={4}
                            value={reps?.toString() ?? ''}
                            onChangeText={(text) => {
                                setReps(Number(text));
                            }}
                        />
                    </FlexView>
                </Row>
            </ExerciseSetContainer>
        </Swipeable>
    );
}
