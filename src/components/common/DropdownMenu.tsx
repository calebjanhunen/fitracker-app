import IonIcons from '@expo/vector-icons/Ionicons';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { Adapt, Select, Sheet, useTheme } from 'tamagui';
interface IDropdownOption {
    id: number;
    name: string;
}

interface Props<T extends IDropdownOption> {
    selectedVal: string;
    setSelectedVal: Dispatch<SetStateAction<string>>;
    options: T[];
    placeholder: string;
    label: string;
    width?: number;
    iconAfter?: boolean;
    selectedColor?: string;
}
export default function DropdownMenu<T extends IDropdownOption>({
    selectedVal,
    setSelectedVal,
    options,
    placeholder,
    label,
    width,
    iconAfter,
    selectedColor,
}: Props<T>) {
    const theme = useTheme();

    function handleValueChange(newValue: string) {
        if (newValue === selectedVal) {
            setSelectedVal('');
        } else {
            setSelectedVal(newValue);
        }
    }

    return (
        <Select
            value={selectedVal}
            onValueChange={handleValueChange}
            onOpenChange={() => Keyboard.dismiss()}
            disablePreventBodyScroll
        >
            <Select.Trigger
                width={width ?? 'auto'}
                justifyContent='center'
                backgroundColor={selectedVal && selectedColor ? selectedColor : '$gray6'}
                iconAfter={iconAfter !== false ? () => <IonIcons name='chevron-down' /> : null}
            >
                <Select.Value
                    fontWeight='bold'
                    color={selectedVal && selectedColor ? '$gray1' : '$gray12'}
                    placeholder={placeholder}
                />
            </Select.Trigger>
            <Adapt when='sm' platform='touch'>
                <Sheet native modal dismissOnSnapToBottom snapPoints={[60]}>
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation='lazy'
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>
            <Select.Content zIndex={200000}>
                <Select.Viewport>
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {useMemo(
                            () =>
                                options.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.id}
                                            value={item.id.toString()}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft='auto'>
                                                <IonIcons
                                                    color={theme.blue10.val}
                                                    size={20}
                                                    name='checkmark'
                                                />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    );
                                }),
                            [options]
                        )}
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select>
    );
}
