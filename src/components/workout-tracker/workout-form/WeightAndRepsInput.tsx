import React, { useRef } from 'react';
import { Input } from 'tamagui';

interface Props {
    isSetValidated: boolean;
    value: number | null;
    onValueChange: (value: string) => void;
    type: 'REPS' | 'WEIGHT';
}

export default function WeightAndRepsInput({ isSetValidated, value, onValueChange, type }: Props) {
    const inputRef = useRef<Input>(null);

    function handleFocus() {
        if (inputRef.current) {
            // Highlight all the text in the input when it gains focus
            inputRef.current.setNativeProps({
                selection: { start: 0, end: value?.toString().length },
            });
        }
    }

    const backgroundColor = () => {
        console.log(type, !value, isSetValidated);
        if (type === 'REPS' && !value && isSetValidated) {
            console.log('invvalid reps');
            return '$red6';
        } else if (type === 'WEIGHT' && value === null && isSetValidated) {
            return '$red6';
        }
        return '$background';
    };

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
            backgroundColor={backgroundColor()}
        />
    );
}
