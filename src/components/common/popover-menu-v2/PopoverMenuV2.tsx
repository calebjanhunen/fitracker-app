import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetView,
    TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { Separator, SizableText, useTheme, XStack } from 'tamagui';

export interface PopoverMenuOptionsV2 {
    text: string;
    textColor: keyof ReturnType<typeof useTheme>;
    icon: keyof typeof IonIcons.glyphMap;
    action: () => Promise<void> | void;
}

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    options: PopoverMenuOptionsV2[];
    height: string;
}

export default function PopoverMenuV2({ isOpen, setIsOpen, options, height }: Props) {
    const ref = useRef<BottomSheetModal>(null);
    const theme = useTheme();

    useEffect(() => {
        if (isOpen) {
            ref.current?.present();
        }
    }, [isOpen]);

    return (
        <BottomSheetModal
            index={0}
            ref={ref}
            snapPoints={[height]}
            backgroundStyle={{
                backgroundColor: theme.gray5.val,
            }}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.3}
                />
            )}
            onDismiss={() => {
                console.log('close');
                setIsOpen(false);
            }}
        >
            <BottomSheetView style={{ flex: 1, paddingHorizontal: 16 }}>
                {/* <YStack backgroundColor={theme.gray1.val} borderRadius='$4'> */}
                <BottomSheetFlatList
                    contentContainerStyle={{ backgroundColor: theme.gray1.val, borderRadius: 10 }}
                    data={options}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={async () => {
                                ref.current?.close();
                                await item.action();
                            }}
                        >
                            <XStack
                                paddingHorizontal='$space.4'
                                paddingVertical='$space.3'
                                alignItems='center'
                                gap='$space.3'
                            >
                                <IonIcons color={item.textColor} size={30} name={item.icon} />
                                <SizableText color={item.textColor} size='$6'>
                                    {item.text}
                                </SizableText>
                            </XStack>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.icon}
                    ItemSeparatorComponent={() => <Separator borderColor={theme.gray5.val} />}
                />
                {/* </YStack> */}
            </BottomSheetView>
        </BottomSheetModal>
    );
}
