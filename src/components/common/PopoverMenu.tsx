import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Popover, SizableText, useTheme, XStack, YStack } from 'tamagui';

export interface PopoverMenuOptions {
    text: string;
    iconColor: keyof ReturnType<typeof useTheme>;
    icon: keyof typeof IonIcons.glyphMap;
    action: () => Promise<void> | void;
}

interface Props {
    menuOptions: PopoverMenuOptions[];
}

export default function PopoverMenu({ menuOptions }: Props) {
    const theme = useTheme();

    async function handleAction(action: () => Promise<void> | void) {
        const result = action();

        if (result instanceof Promise) {
            await result;
        }
    }

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
                <YStack padding='$space.2' paddingRight='$space.7' gap='$space.3'>
                    {menuOptions.map((option, index) => (
                        <Popover.Close asChild key={index}>
                            <TouchableOpacity
                                onPress={async () => await handleAction(option.action)}
                            >
                                <XStack alignItems='center' gap='$space.3'>
                                    <IonIcons
                                        color={option.iconColor}
                                        name={option.icon}
                                        size={18}
                                    />
                                    <SizableText color='white' size='$5' fontWeight='bold'>
                                        {option.text}
                                    </SizableText>
                                </XStack>
                            </TouchableOpacity>
                        </Popover.Close>
                    ))}
                </YStack>
                <Popover.Arrow backgroundColor='$gray12' />
            </Popover.Content>
        </Popover>
    );
}
