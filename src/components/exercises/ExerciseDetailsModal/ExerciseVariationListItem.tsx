import React from 'react';
import { ExerciseVariationDto } from 'src/api/generated';
import { SizableText, View, XStack, YStack } from 'tamagui';

interface Props {
    exerciseVariation: ExerciseVariationDto;
}

export default function ExerciseVariationListItem({ exerciseVariation }: Props) {
    return (
        <View borderColor='$gray7' borderWidth={1} borderRadius={10} padding='$space.2'>
            <YStack gap='$space.2'>
                <XStack gap='$space.2' alignItems='center'>
                    <SizableText fontWeight='bold'>{exerciseVariation.name}</SizableText>
                    <SizableText>({exerciseVariation.cableAttachment})</SizableText>
                </XStack>
                {exerciseVariation.notes && (
                    <YStack>
                        <SizableText color='$gray10'>Notes</SizableText>
                        <SizableText>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </SizableText>
                    </YStack>
                )}
            </YStack>
        </View>
    );
}
