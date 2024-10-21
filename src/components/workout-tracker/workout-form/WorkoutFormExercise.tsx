import React, { Dispatch, memo, SetStateAction } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, H3, SizableText, useTheme, XStack } from 'tamagui';

import { useRouter } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { useDeleteAnimation } from 'src/hooks/workout-tracker/useDeleteAnimation';
import { RootState } from 'src/redux/Store';
import {
    addSetToExercise,
    deleteExerciseFromWorkout,
} from 'src/redux/workout-form/WorkoutFormSlice';
import { PopoverMenuOptionsV2, PopoverMenuV2 } from '../../common/popover-menu-v2';
import WorkoutFormSet from './WorkoutFormSet';

interface Props {
    id: string;
    order: number;
    drag: () => void;
    isActive: boolean;
    isDragging: boolean;
    setIsDragging: Dispatch<SetStateAction<boolean>>;
    validatedSets: string[];
}

const WorkoutFormExercise = memo(function WorkoutFormExercise({
    id,
    drag,
    isActive,
    isDragging,
    setIsDragging,
    validatedSets,
}: Props) {
    const exercise = useSelector((state: RootState) => state.workoutForm.exercises[id]);
    const recentSets = useSelector((state: RootState) => state.workoutForm.recentSets);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    const { animatedStyle, handleDelete, handleLayout } = useDeleteAnimation({
        onDelete: () => dispatch(deleteExerciseFromWorkout({ exerciseId: exercise.id })),
    });
    const menuOptions: PopoverMenuOptionsV2[] = [
        {
            text: 'Replace Exercise',
            icon: 'swap-horizontal-outline',
            textColor: theme.gray12.val,
            action: () => {
                router.push({
                    pathname: '/workout-tracker/ReplaceExercise',
                    params: { oldExerciseId: id },
                });
            },
        },
        {
            text: 'Remove Exercise',
            icon: 'trash',
            textColor: theme.red10.val,
            action: handleDelete,
        },
    ];

    if (!exercise) {
        return null;
    }

    function onAddSetPress() {
        dispatch(addSetToExercise({ exerciseId: exercise.id }));
    }

    function startDrag() {
        setIsDragging(true);
        setTimeout(() => {
            drag();
        }, 15);
    }

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    flex: 1,
                    backgroundColor: isActive ? theme.gray6.val : theme.background.val,
                    height: isDragging ? 40 : 'auto',
                    overflow: 'hidden',
                },
            ]}
            onLayout={handleLayout}
        >
            <XStack alignItems='center' justifyContent='space-between'>
                <H3
                    flex={1}
                    numberOfLines={1}
                    color='$blue10'
                    onLongPress={startDrag}
                    userSelect='none'
                >
                    {exercise.name}
                </H3>
                <PopoverMenuV2 height='20%' options={menuOptions} />
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
                    renderItem={({ item, index }) => {
                        const recentSet = recentSets[exercise.recentSets[index]];
                        return (
                            <WorkoutFormSet
                                id={item}
                                order={index + 1}
                                exerciseId={id}
                                recentSet={recentSet ?? null}
                                isSetValidated={validatedSets.includes(item)}
                            />
                        );
                    }}
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
