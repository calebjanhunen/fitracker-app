import { useEffect, useState } from 'react';
import { Keyboard, type KeyboardEvent } from 'react-native';

interface IUseKeyboard {
    keyboardHeight: number;
}

export function useKeyboard(): IUseKeyboard {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        function onKeyboardDidShow(e: KeyboardEvent): void {
            setKeyboardHeight(e.endCoordinates.height);
        }

        function onKeyboardDidHide(): void {
            setKeyboardHeight(0);
        }

        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return { keyboardHeight };
}
