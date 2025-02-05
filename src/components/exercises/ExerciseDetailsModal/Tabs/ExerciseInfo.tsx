import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ExerciseVariationDto } from 'src/api/generated';
import { SizableText, View, XStack, YStack } from 'tamagui';
import ExerciseVariationListItem from './ExerciseVariationListItem';

interface Props {
    bodyPart: string;
    equipment: string;
    exerciseVariations: ExerciseVariationDto[];
}

export default function ExerciseInfo({ bodyPart, exerciseVariations, equipment }: Props) {
    return (
        <View>
            <YStack gap='$space.5'>
                <XStack gap='$space.10'>
                    <YStack>
                        <SizableText color='$gray10'>Body Part</SizableText>
                        <SizableText marginTop={-5}>{bodyPart}</SizableText>
                    </YStack>
                    <YStack>
                        <SizableText color='$gray10'>Equipment</SizableText>
                        <SizableText marginTop={-5}>{equipment}</SizableText>
                    </YStack>
                </XStack>
                <YStack>
                    <SizableText color='$gray10'>Exercise Variations</SizableText>
                    <FlatList
                        ListEmptyComponent={<SizableText>No Exercise Variations</SizableText>}
                        ItemSeparatorComponent={() => <View height='$space.3' />}
                        data={exerciseVariations}
                        renderItem={({ item }) => (
                            <ExerciseVariationListItem exerciseVariation={item} />
                        )}
                    />
                </YStack>
            </YStack>
        </View>
    );
}
