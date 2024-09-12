import React, { memo } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Input, SizableText, XStack } from 'tamagui';

import { Animated } from 'react-native';
import { useDeleteAnimation } from 'src/hooks/workout-tracker/useDeleteAnimation';
import { RootState } from 'src/redux/Store';
import {
    deleteSetFromExercise,
    updateSetReps,
    updateSetRpe,
    updateSetWeight,
} from 'src/redux/workout-form/WorkoutFormSlice';

interface Props {
    id: string;
    order: number;
    exerciseId: string;
}

const WorkoutFormSet = memo(function WorkoutFormset({ id, order, exerciseId }: Props) {
    const set = useSelector((state: RootState) => state.workoutForm.sets[id]);
    const dispatch = useDispatch();
    const { animatedStyle, handleDelete, handleLayout } = useDeleteAnimation({
        onDelete: () => dispatch(deleteSetFromExercise({ setId: set.id, exerciseId })),
    });

    function onWeightChange(text: string) {
        if (text) {
            dispatch(updateSetWeight({ setId: set.id, weight: parseInt(text) }));
        } else {
            dispatch(updateSetWeight({ setId: set.id, weight: null }));
        }
    }

    function onRepsChange(text: string) {
        if (text) {
            dispatch(updateSetReps({ setId: set.id, reps: parseInt(text) }));
        } else {
            dispatch(updateSetReps({ setId: set.id, reps: null }));
        }
    }

    function onRpeChange(text: string) {
        if (text) {
            dispatch(updateSetRpe({ setId: set.id, rpe: parseInt(text) }));
        } else {
            dispatch(updateSetRpe({ setId: set.id, rpe: null }));
        }
    }

    return (
        set && (
            <Animated.View style={[animatedStyle, { flex: 1 }]} onLayout={handleLayout}>
                <Swipeable
                    renderRightActions={() => (
                        <XStack
                            backgroundColor='$red9'
                            flex={1}
                            justifyContent='flex-end'
                            alignItems='center'
                            paddingRight='$2'
                        >
                            <SizableText color='white' fontWeight='bold'>
                                Delete
                            </SizableText>
                        </XStack>
                    )}
                    onSwipeableWillOpen={() => handleDelete()}
                >
                    <XStack
                        alignItems='center'
                        justifyContent='center'
                        backgroundColor='$background'
                        paddingVertical='$2'
                    >
                        <SizableText textAlign='center' size='$5' flex={1} fontWeight='bold'>
                            {order}
                        </SizableText>
                        <SizableText textAlign='center' size='$4' flex={2}>
                            140x8@10
                        </SizableText>
                        <Input
                            size='$2'
                            flex={1}
                            padding={0}
                            textAlign='center'
                            maxLength={4}
                            keyboardType='number-pad'
                            value={set.weight?.toString() ?? ''}
                            onChangeText={onWeightChange}
                        />
                        <Input
                            size='$2'
                            flex={1}
                            padding={0}
                            textAlign='center'
                            maxLength={4}
                            keyboardType='number-pad'
                            value={set.reps?.toString() ?? ''}
                            onChangeText={onRepsChange}
                        />
                        <Input
                            size='$2'
                            flex={0.7}
                            padding={0}
                            textAlign='center'
                            maxLength={2}
                            keyboardType='number-pad'
                            value={set.rpe?.toString() ?? ''}
                            onChangeText={onRpeChange}
                        />
                    </XStack>
                </Swipeable>
            </Animated.View>
        )
    );
});

/*
return (
         <Stack position='relative' overflow='hidden' flex={1} zIndex={0}>
                <Stack
                    flex={1}
                    position='absolute'
                    top={0}
                    bottom={0}
                    right={0}
                    left={0}
                    justifyContent='center'
                    alignItems='flex-end'
                    backgroundColor={'red'}
                    paddingRight='$3'
                    zIndex={1}
                >
                    <SizableText color='white' fontWeight='bold'>
                        Delete
                    </SizableText>
                </Stack>
                <GestureDetector gesture={swipeGesture}>
                    <Animated.View style={[animatedStyle, { zIndex: 2 }]}>
                        <XStack
                            alignItems='center'
                            justifyContent='center'
                            backgroundColor='$background'
                            paddingVertical='$2'
                        >
                            <SizableText textAlign='center' size='$5' flex={1} fontWeight='bold'>
                                {order}
                            </SizableText>
                            <SizableText textAlign='center' size='$4' flex={2}>
                                140x8@10
                            </SizableText>
                            <Input
                                size='$2'
                                flex={1}
                                padding={0}
                                textAlign='center'
                                maxLength={4}
                                keyboardType='number-pad'
                                value={set.weight?.toString() ?? ''}
                                onChangeText={onWeightChange}
                            />
                            <Input
                                size='$2'
                                flex={1}
                                padding={0}
                                textAlign='center'
                                maxLength={4}
                                keyboardType='number-pad'
                                value={set.reps?.toString() ?? ''}
                                onChangeText={onRepsChange}
                            />
                            <Input
                                size='$2'
                                flex={0.7}
                                padding={0}
                                textAlign='center'
                                maxLength={2}
                                keyboardType='number-pad'
                                value={set.rpe?.toString() ?? ''}
                                onChangeText={onRpeChange}
                            />
                        </XStack>
                    </Animated.View>
                </GestureDetector>
            </Stack>
    );
*/
export default WorkoutFormSet;
