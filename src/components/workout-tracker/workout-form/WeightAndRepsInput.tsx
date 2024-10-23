import React, { useRef } from 'react';
import { Input } from 'tamagui';

interface Props {
    isSetValidated: boolean;
    value: number | null;
    onValueChange: (value: string) => void;
}

export default function WeightAndRepsInput({ isSetValidated, value, onValueChange }: Props) {
    const inputRef = useRef<Input>(null);

    function handleFocus() {
        if (inputRef.current) {
            // Highlight all the text in the input when it gains focus
            inputRef.current.setNativeProps({
                selection: { start: 0, end: value?.toString().length },
            });
        }
    }

    return (
        <Input
            ref={inputRef}
            onFocus={handleFocus}
            size='$3'
            flex={1}
            padding={0}
            textAlign='center'
            maxLength={4}
            keyboardType='number-pad'
            value={value?.toString() ?? ''}
            onChangeText={onValueChange}
            borderRadius={10}
            backgroundColor={!value && isSetValidated ? '$red6' : '$background'}
        />
    );
}
