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
            <SizableText
                size='$4'
                fontWeight='bold'
                color='$gray1'
                numberOfLines={1}
                paddingRight={155}
            >
                {username}
            </SizableText>
        </XStack>
    );
}
