import React, { memo } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SizableText, View, XStack } from 'tamagui';

import { Animated } from 'react-native';
import { useDeleteAnimation } from 'src/hooks/workout-tracker/useDeleteAnimation';
import { RootState } from 'src/redux/Store';
import { deleteSetFromExercise } from 'src/redux/workout-template-form/WorkoutTemplateFormSlice';

interface Props {
    id: string;
    order: number;
    exerciseId: string;
}

const WorkoutTemplateFormSet = memo(function WorkoutTemplateFormSet({
    id,
    order,
    exerciseId,
}: Props) {
    const set = useSelector((state: RootState) => state.workoutTemplateForm.sets[id]);
    const dispatch = useDispatch();
    const { animatedStyle, handleDelete, handleLayout } = useDeleteAnimation({
        onDelete: () => dispatch(deleteSetFromExercise({ setId: set.id, exerciseId })),
    });

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
                        <View flex={2} />
                        <View flex={1} />
                        <View flex={1} />
                        <View flex={1} />
                    </XStack>
                </Swipeable>
            </Animated.View>
        )
    );
});
export default WorkoutTemplateFormSet;
