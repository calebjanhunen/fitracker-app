import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Button, Popover, SizableText, useTheme, XStack, YStack } from 'tamagui';

interface Props {
    onDelete: () => void;
}

export default function PopoverMenu({ onDelete }: Props) {
    const theme = useTheme();

    return (
        <Popover size='$5' allowFlip placement='left-start'>
            <Popover.Trigger asChild>
                <Button
                    paddingVertical='$1'
                    paddingHorizontal='$2'
                    backgroundColor='$blue6'
                    height='0'
                >
                    <IonIcons size={18} name='ellipsis-horizontal' color={theme.blue10.val} />
                </Button>
            </Popover.Trigger>
            <Popover.Content backgroundColor='$gray12' padding='0'>
                <YStack>
                    <Popover.Close asChild>
                        <Button
                            height='0'
                            paddingVertical='$2'
                            chromeless
                            borderRadius='0'
                            onPress={onDelete}
                        >
                            <XStack alignItems='center' gap='$2'>
                                <IonIcons color={theme.red11.val} name='trash' size={18} />
                                <SizableText fontWeight='bold' color='white'>
                                    Delete
                                </SizableText>
                            </XStack>
                        </Button>
                    </Popover.Close>
                </YStack>
                <Popover.Arrow backgroundColor='$gray12' />
            </Popover.Content>
        </Popover>
    );
}
