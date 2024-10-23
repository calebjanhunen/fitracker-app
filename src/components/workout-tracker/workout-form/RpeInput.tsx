import React, { useRef } from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, SizableText, useTheme, View, XStack, YStack } from 'tamagui';

interface Props {
    rpeVal: number | null;
    onRpeSelect: (rpe: number | null) => void;
}

export default function RpeInput({ rpeVal, onRpeSelect }: Props) {
    const theme = useTheme();
    const ref = useRef<BottomSheetModal>(null);

    return (
        <View flex={0.6} alignSelf='stretch'>
            <TouchableOpacity
                style={{ height: '100%' }}
                onPress={() => {
                    Keyboard.dismiss();
                    ref.current?.present();
                }}
            >
                <View
                    flex={1}
                    borderWidth={1}
                    borderColor='$gray7'
                    borderRadius={20}
                    alignItems='center'
                    justifyContent='center'
                >
                    <SizableText textAlign='center' size='$3'>
                        {rpeVal}
                    </SizableText>
                </View>
            </TouchableOpacity>
            <BottomSheetModal
                index={0}
                ref={ref}
                snapPoints={['35%']}
                backgroundStyle={{ backgroundColor: theme.gray9.val }}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        opacity={0.1}
                    />
                )}
            >
                <BottomSheetView style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center' }}>
                    <XStack flexWrap='wrap' justifyContent='center' gap='$space.3'>
                        {data.map((num, index) => (
                            <Button
                                size='$6'
                                padding={0}
                                width='20%'
                                key={index}
                                onPress={() => {
                                    rpeVal === num ? onRpeSelect(null) : onRpeSelect(num);
                                }}
                                backgroundColor={num === rpeVal ? '$gray12' : '$gray1'}
                            >
                                <SizableText
                                    color={num === rpeVal ? '$gray1' : '$gray12'}
                                    size='$5'
                                >
                                    {num}
                                </SizableText>
                            </Button>
                        ))}
                        <Button
                            backgroundColor='$blue6'
                            size='$6'
                            padding={0}
                            width='20%'
                            onPress={() => ref.current?.close()}
                        >
                            <YStack alignItems='center' justifyContent='center' gap='$space.1'>
                                <IonIcons
                                    name='keypad-outline'
                                    size={24}
                                    color={theme.blue10.val}
                                />
                                <IonIcons
                                    name='chevron-down-outline'
                                    size={10}
                                    color={theme.blue10.val}
                                />
                            </YStack>
                        </Button>
                    </XStack>
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
}

const data = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
