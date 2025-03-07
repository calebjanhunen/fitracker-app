import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ExerciseVariationDto } from 'src/api/generated';
import { SizableText, View, XStack, YStack } from 'tamagui';
import ExerciseVariationListItem from './ExerciseVariationListItem';

interface Props {
    bodyPart: string;
    equipment: string;
    exerciseVariations: ExerciseVariationDto[];
    isVariation: boolean;
    parentExerciseName?: string;
    notes?: string;
}

export default function ExerciseInfo({
    bodyPart,
    exerciseVariations,
    equipment,
    isVariation,
    parentExerciseName,
    notes,
}: Props) {
    return (
        <View flex={1}>
            <YStack gap='$space.5' flex={1}>
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
                {isVariation ? (
                    <YStack gap='$space.5'>
                        <YStack>
                            <SizableText color='$gray10'>Parent Exercise</SizableText>
                            <SizableText marginTop={-5}>{parentExerciseName}</SizableText>
                        </YStack>
                        <YStack>
                            <SizableText color='$gray10'>Notes</SizableText>
                            {notes ? (
                                <SizableText marginTop={-5}>{notes}</SizableText>
                            ) : (
                                <Text style={{ fontStyle: 'italic', fontWeight: '300' }}>
                                    No Notes - Edit Exercise to add notes
                                </Text>
                            )}
                        </YStack>
                    </YStack>
                ) : (
                    <YStack flex={1}>
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
                )}
            </YStack>
        </View>
    );
}
