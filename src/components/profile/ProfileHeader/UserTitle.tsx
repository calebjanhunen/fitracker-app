import React from 'react';
import { SizableText, YStack } from 'tamagui';

interface Props {
    username: string;
    firstName: string;
    lastName: string;
}

export default function UserTitle({ username, firstName, lastName }: Props) {
    return (
        <YStack gap='$space.0' flex={1}>
            <SizableText size='$6' fontWeight='bold' numberOfLines={1}>
                {firstName} {lastName}
            </SizableText>
            <SizableText marginTop='$space.-2' color='$gray10'>
                @{username}
            </SizableText>
        </YStack>
    );
}
