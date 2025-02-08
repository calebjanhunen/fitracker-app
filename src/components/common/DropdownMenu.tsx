import IonIcons from '@expo/vector-icons/Ionicons';
import React, { Dispatch, SetStateAction } from 'react';
import { Keyboard } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Adapt, Select, Sheet, useTheme } from 'tamagui';
interface IDropdownOption {
    id: number | string;
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
                        <Adapt.Contents />
                    </Sheet.Frame>
                    <Sheet.Overlay />
                </Sheet>
            </Adapt>
            <Select.Content zIndex={200000}>
                <Select.Viewport>
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        <FlatList
                            initialNumToRender={1}
                            nestedScrollEnabled
                            data={options}
                            renderItem={({ item, index }) => (
                                <Select.Item index={index} key={item.id} value={item.id.toString()}>
                                    <Select.ItemText>{item.name}</Select.ItemText>
                                    <Select.ItemIndicator marginLeft='auto'>
                                        <IonIcons
                                            color={theme.blue10.val}
                                            size={20}
                                            name='checkmark'
                                        />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            )}
                        />
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select>
    );
}
