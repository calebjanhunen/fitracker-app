import React from 'react';
import { UserAvatar } from 'src/components/common';
import { SizableText, XStack } from 'tamagui';

interface Props {
    username: string;
}

export default function UserInfo({ username }: Props) {
    return (
        <XStack alignItems='center' gap='$space.2'>
            <UserAvatar size={40} />
            <SizableText size='$6' fontWeight='bold' color='$gray1'>
                {username}
            </SizableText>
        </XStack>
    );
}
