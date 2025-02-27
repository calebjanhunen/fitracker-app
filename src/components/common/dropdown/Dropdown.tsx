import IonIcons from '@expo/vector-icons/Ionicons';
import React, { Dispatch, SetStateAction } from 'react';
import { Keyboard } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { SizableText, useTheme, XStack } from 'tamagui';

interface DropdownOption {
    id: number | string;
    name: string;
    [key: string]: any;
}

interface Props<T extends DropdownOption> {
    data: T[];
    selectedValue: T | null;
    setSelectedValue: Dispatch<SetStateAction<T | null>>;
    placeholder: string;
    isOptional?: boolean;
    isDisabled?: boolean;
}

export default function Dropdown<T extends DropdownOption>({
    data,
    selectedValue,
    setSelectedValue,
    placeholder,
    isOptional = false,
    isDisabled = false,
}: Props<T>) {
    const theme = useTheme();

    function onValueChange(value: T) {
        if (isOptional && value.id === selectedValue?.id) {
            setSelectedValue(null);
        } else {
            setSelectedValue(value);
        }
    }

    const renderItem = (item: DropdownOption) => (
        <XStack
            alignItems='center'
            justifyContent='space-between'
            paddingVertical='$space.2'
            paddingHorizontal='$space.3'
        >
            <SizableText>{item.name}</SizableText>
            {item.id === selectedValue?.id && (
                <IonIcons name='checkmark' color={theme.blue10.val} size={15} />
            )}
        </XStack>
    );

    return (
        <RNDropdown
            style={{
                backgroundColor: theme.gray6.val,
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 10,
            }}
            renderRightIcon={() => (
                <IonIcons
                    name={isDisabled ? 'lock-closed' : 'chevron-down'}
                    size={18}
                    color={theme.gray10.val}
                />
            )}
            disable={isDisabled}
            onFocus={() => Keyboard.dismiss()}
            fontFamily='Inter'
            placeholderStyle={{ fontWeight: 'bold', fontSize: 14 }}
            selectedTextStyle={{ fontWeight: 'bold', fontSize: 14 }}
            containerStyle={{ borderRadius: 10 }}
            data={data}
            labelField={'name'}
            valueField={'id'}
            value={selectedValue}
            autoScroll={false}
            onChange={onValueChange}
            placeholder={placeholder}
            renderItem={renderItem}
        />
    );
}
