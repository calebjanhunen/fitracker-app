import React from 'react';
import { H3, SizableText, YStack } from 'tamagui';

interface Props {
    username: string;
    firstName: string;
    lastName: string;
}

export default function UserTitle({ username, firstName, lastName }: Props) {
    return (
        <YStack gap='$space.0'>
            <H3>
                {firstName} {lastName}
            </H3>
            <SizableText marginTop='$space.-2' color='$gray10'>
                @{username}
            </SizableText>
        </YStack>
    );
}
