import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import PopoverMenu, { PopoverMenuOptions } from 'src/components/common/PopoverMenu';
import { Card, H4, SizableText, useTheme, XStack } from 'tamagui';

export default function WorkoutHistoryCard() {
    const theme = useTheme();
    const menuOptions: PopoverMenuOptions[] = [
        {
            text: 'Edit',
            action: () => {},
            icon: 'create-outline',
            iconColor: theme.blue10.val,
        },
        {
            text: 'Delete',
            action: () => {},
            icon: 'trash-outline',
            iconColor: theme.red10.val,
        },
    ];

    return (
        <Card>
            <Card.Header elevate bordered borderRadius='$radius.5'>
                <XStack alignItems='center' justifyContent='space-between'>
                    <H4>Pull 1</H4>
                    <PopoverMenu menuOptions={menuOptions} />
                </XStack>
                <XStack gap='$space.4'>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='calendar-outline' size={15} />
                        <SizableText color='$gray10'>Mar 04 2024</SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='time-outline' size={15} />
                        <SizableText color='$gray10'>30 mins</SizableText>
                    </XStack>
                </XStack>
                <FlatList
                    scrollEnabled={false}
                    ListHeaderComponent={() => (
                        <SizableText fontWeight='bold'>Exercises</SizableText>
                    )}
                    data={[0, 0, 0]}
                    renderItem={() => (
                        <XStack gap='$space.3'>
                            <SizableText>Bicep Curl - 3 Sets</SizableText>
                        </XStack>
                    )}
                />
            </Card.Header>
        </Card>
    );
}
