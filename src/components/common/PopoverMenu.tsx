import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Button, Popover, SizableText, useTheme, XStack, YStack } from 'tamagui';

interface MenuOptions {
    text: string;
    iconColor: keyof ReturnType<typeof useTheme>;
    icon: keyof typeof IonIcons.glyphMap;
    action: () => Promise<void> | void;
}

interface Props {
    menuOptions: MenuOptions[];
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
                <YStack>
                    {menuOptions.map((option, index) => (
                        <Popover.Close asChild key={index}>
                            <Button
                                height='0'
                                paddingVertical='$2'
                                chromeless
                                borderRadius='0'
                                onPress={async () => await handleAction(option.action)}
                            >
                                <XStack alignItems='center' gap='$2'>
                                    <IonIcons
                                        color={option.iconColor}
                                        name={option.icon}
                                        size={18}
                                    />
                                    <SizableText fontWeight='bold' color='white'>
                                        {option.text}
                                    </SizableText>
                                </XStack>
                            </Button>
                        </Popover.Close>
                    ))}
                </YStack>
                <Popover.Arrow backgroundColor='$gray12' />
            </Popover.Content>
        </Popover>
    );
}
