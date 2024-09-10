import React from 'react';
import { Input, SizableText, XStack } from 'tamagui';

export default function WorkoutFormSet() {
    return (
        <XStack alignItems='center' justifyContent='center'>
            <SizableText textAlign='center' size='$5' flex={1} fontWeight='bold'>
                1
            </SizableText>
            <SizableText textAlign='center' size='$4' flex={2}>
                140x8@10
            </SizableText>
            <Input
                size='$2'
                flex={1}
                padding={0}
                textAlign='center'
                maxLength={4}
                keyboardType='number-pad'
            />
            <Input
                size='$2'
                flex={1}
                padding={0}
                textAlign='center'
                maxLength={4}
                keyboardType='number-pad'
            />
            <Input
                size='$2'
                flex={0.7}
                padding={0}
                textAlign='center'
                maxLength={2}
                keyboardType='number-pad'
            />
        </XStack>
    );
}
