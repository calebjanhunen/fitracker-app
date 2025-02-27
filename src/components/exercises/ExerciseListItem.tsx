import React, { Dispatch, memo, SetStateAction } from 'react';
import { Keyboard } from 'react-native';
import { ExerciseResponseDto, ExerciseResponseDtoExerciseTypeEnum } from 'src/api/generated';
import { SizableText, View, XStack, YStack } from 'tamagui';

interface Props {
    exercise: ExerciseResponseDto;
    index: number;
    setSelectedExercise: Dispatch<SetStateAction<ExerciseResponseDto | null>>;
}
const ExerciseListItem = memo(function ExerciseListItem({
    exercise,
    index,
    setSelectedExercise,
}: Props) {
    function onExercisePress() {
        Keyboard.dismiss();
        setSelectedExercise(exercise);
    }

    return (
        <YStack
            paddingVertical='$space.2'
            gap='$space.1'
            borderTopColor='$gray8'
            borderTopWidth={index === 0 ? 1 : 0}
            borderBottomColor='$gray8'
            borderBottomWidth={1}
            onPress={onExercisePress}
        >
            <SizableText size='$5' fontWeight='bold'>
                {exercise.name} ({exercise.equipment})
            </SizableText>
            <XStack justifyContent='space-between' alignItems='center'>
                <SizableText color='$gray10'>{exercise.bodyPart}</SizableText>
                {exercise.exerciseType === ExerciseResponseDtoExerciseTypeEnum.Variation && (
                    <View backgroundColor='$blue8' paddingHorizontal='$space.3' borderRadius={20}>
                        <SizableText color='$gray1' fontWeight='bold'>
                            Variation
                        </SizableText>
                    </View>
                )}
            </XStack>
        </YStack>
    );
});

export default ExerciseListItem;
