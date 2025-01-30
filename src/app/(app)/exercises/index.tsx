import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H3, Input, SizableText, useTheme, XStack, YStack } from 'tamagui';

export default function ExercisesHome() {
    const theme = useTheme();
    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.background.val }}
            edges={['top']}
        >
            <H3 paddingBottom='$space.3'>Exercises</H3>
            <YStack paddingBottom='$space.5'>
                <Input placeholder='Search for exercise' />
            </YStack>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                renderItem={({ item, index }) => (
                    <YStack
                        paddingVertical='$space.2'
                        gap='$space.1'
                        borderTopColor='$gray8'
                        borderTopWidth={index === 0 ? 1 : 0}
                        borderBottomColor='$gray8'
                        borderBottomWidth={1}
                    >
                        <SizableText size='$5' fontWeight='bold'>
                            Exercise Name (Equipment)
                        </SizableText>
                        <XStack alignItems='center' justifyContent='space-between'>
                            <SizableText color='$gray10'>Body Part</SizableText>
                            <YStack
                                backgroundColor='$blue6'
                                borderRadius='$10'
                                paddingHorizontal='$space.2'
                                paddingVertical='$space.1'
                            >
                                <SizableText color='$blue10' size='$2'>
                                    Variation
                                </SizableText>
                            </YStack>
                        </XStack>
                    </YStack>
                )}
            />
        </SafeAreaView>
    );
}
