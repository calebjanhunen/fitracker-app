import React, { memo } from 'react';
import { Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SizableText, XStack } from 'tamagui';

import { RecentSetDto } from 'src/api/generated';
import { useDeleteAnimation } from 'src/hooks/workout-tracker/useDeleteAnimation';
import { RootState } from 'src/redux/Store';
import {
    deleteSetFromExercise,
    updateSetReps,
    updateSetRpe,
    updateSetWeight,
} from 'src/redux/workout-form/WorkoutFormSlice';
import RpeInput from './RpeInput';
import WeightAndRepsInput from './WeightAndRepsInput';

interface Props {
    id: string;
    order: number;
    exerciseId: string;
    recentSet: RecentSetDto | null;
    isSetValidated: boolean;
}

const WorkoutFormSet = memo(function WorkoutFormset({
    id,
    order,
    exerciseId,
    recentSet,
    isSetValidated,
}: Props) {
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

    function onRpeSelect(rpe: number | null) {
        dispatch(updateSetRpe({ setId: set.id, rpe }));
    }

    return (
        set && (
            <>
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
                            gap='$space.3'
                        >
                            <SizableText textAlign='center' size='$5' flex={0.7} fontWeight='bold'>
                                {order}
                            </SizableText>
                            <SizableText textAlign='center' size='$4' flex={2}>
                                {recentSet &&
                                    `${recentSet.weight}x${recentSet.reps}${
                                        recentSet.rpe ? `@${recentSet.rpe}` : ''
                                    }`}
                            </SizableText>
                            <WeightAndRepsInput
                                isSetValidated={isSetValidated}
                                value={set.weight}
                                onValueChange={onWeightChange}
                                type='WEIGHT'
                            />
                            <WeightAndRepsInput
                                isSetValidated={isSetValidated}
                                value={set.reps}
                                onValueChange={onRepsChange}
                                type='REPS'
                            />
                            <RpeInput rpeVal={set.rpe} onRpeSelect={onRpeSelect} />
                        </XStack>
                    </Swipeable>
                </Animated.View>
            </>
        )
    );
});
export default WorkoutFormSet;
