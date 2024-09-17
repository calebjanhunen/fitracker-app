import IonIcons from '@expo/vector-icons/Ionicons';
import React, { Dispatch, SetStateAction } from 'react';
import { Keyboard } from 'react-native';
import { Adapt, Select, Sheet } from 'tamagui';
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
}
export default function DropdownMenu<T extends IDropdownOption>({
    selectedVal,
    setSelectedVal,
    options,
    placeholder,
    label,
}: Props<T>) {
    return (
        <Select
            value={selectedVal}
            onValueChange={setSelectedVal}
            onOpenChange={() => Keyboard.dismiss()}
            disablePreventBodyScroll
        >
            <Select.Trigger
                iconAfter={() => <IonIcons name='chevron-down' />}
                backgroundColor='$background'
            >
                <Select.Value placeholder={placeholder} />
            </Select.Trigger>
            <Adapt when='sm' platform='touch'>
                <Sheet native modal dismissOnSnapToBottom snapPoints={[30]}>
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
                <Select.Viewport minWidth={200}>
                    <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {options.map((item, i) => {
                            return (
                                <Select.Item index={i} key={item.id} value={item.id.toString()}>
                                    <Select.ItemText>{item.name}</Select.ItemText>
                                    <Select.ItemIndicator marginLeft='auto'>
                                        <IonIcons name='checkmark' />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            );
                        })}
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select>
    );
}
