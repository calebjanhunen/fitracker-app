import React, { memo } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, H3, SizableText, XStack } from 'tamagui';

import { FlatList } from 'react-native-gesture-handler';
import PopoverMenu from 'src/components/common/popover-menu';
import { useDeleteAnimation } from 'src/hooks/workout-tracker/useDeleteAnimation';
import { RootState } from 'src/redux/Store';
import {
    addSetToExercise,
    deleteExerciseFromWorkout,
} from 'src/redux/workout-form/WorkoutFormSlice';
import WorkoutFormSet from './workout-form-set';

interface Props {
    id: string;
    order: number;
}

const WorkoutFormExercise = memo(function WorkoutFormExercise({ id, order }: Props) {
    const exercise = useSelector((state: RootState) => state.workoutForm.exercises[id]);
    const dispatch = useDispatch();
    const { animatedStyle, handleDelete, handleLayout } = useDeleteAnimation({
        onDelete: () => dispatch(deleteExerciseFromWorkout({ exerciseId: exercise.id })),
    });

    function onAddSetPress() {
        dispatch(
            addSetToExercise({
                exerciseId: exercise.id,
                set: {
                    id: Date.now().toString(),
                    weight: null,
                    reps: null,
                    rpe: null,
                },
            })
        );
    }

    return (
        <Animated.View style={[animatedStyle, { flex: 1 }]} onLayout={handleLayout}>
            <XStack alignItems='center' justifyContent='space-between'>
                <H3 flex={1} numberOfLines={1} color='$blue10'>
                    Exercise: {order}
                </H3>
                <PopoverMenu onDelete={handleDelete} />
            </XStack>
            <XStack>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={1}>
                    Set
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={2}>
                    Previous Set
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={1}>
                    Weight
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={1}>
                    Reps
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={0.7}>
                    RPE
                </SizableText>
            </XStack>
            {exercise?.sets && (
                <FlatList
                    data={exercise.sets}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ item, index }) => (
                        <WorkoutFormSet id={item} order={index + 1} exerciseId={id} />
                    )}
                    keyExtractor={(item) => item.toString()}
                />
            )}
            <Button
                size='$2'
                marginTop='$3'
                backgroundColor='$gray6'
                color='$color'
                fontWeight='bold'
                onPress={onAddSetPress}
            >
                Add Set
            </Button>
        </Animated.View>
    );
});

export default WorkoutFormExercise;
