import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenViewWithKeyboard } from 'src/components/common';
import { IconBtnV2 } from 'src/components/common/buttons';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { SizableText, Tabs, View, XStack } from 'tamagui';
import CreateExerciseForm from './CreateExerciseForm';
import CreateExerciseVariationForm from './CreateExerciseVariationForm';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EXERCISE_TAB = 'exercise';
const VARIATION_TAB = 'variation';

export default function CreateExerciseModal({ isOpen, setIsOpen }: Props) {
    const [selectedTab, setSelectedTab] = useState(EXERCISE_TAB);

    useEffect(() => {
        if (isOpen) {
            setSelectedTab(EXERCISE_TAB);
        }
    }, [isOpen]);

    return (
        <Modal key='modal' open={isOpen} onOpenChange={setIsOpen}>
            <KeyboardAvoidingView
                style={{
                    width: '100%',
                    flex: 1,
                    zIndex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ModalOverlay key='overlay' onPress={() => setIsOpen(false)} />
                <ModalContent key='content' padding={0} width='90%' height='42%'>
                    <ScreenViewWithKeyboard
                        isFlex={false}
                        paddingVertical='$space.3'
                        paddingHorizontal='$space.4'
                    >
                        <XStack alignItems='center' position='relative' justifyContent='center'>
                            <IconBtnV2
                                iconSize={20}
                                backgroundColor='$gray7'
                                onPress={() => setIsOpen(false)}
                                iconName='close-outline'
                                position='absolute'
                                left={0}
                            />
                            <SizableText size='$6' fontWeight='bold'>
                                Create Exercise {selectedTab === VARIATION_TAB ? 'Variation' : ''}
                            </SizableText>
                            <View />
                        </XStack>
                        <Tabs
                            paddingTop='$space.3'
                            orientation='horizontal'
                            flexDirection='column'
                            value={selectedTab}
                            onValueChange={setSelectedTab}
                        >
                            <Tabs.List>
                                <Tabs.Tab
                                    flex={1}
                                    value={EXERCISE_TAB}
                                    backgroundColor={
                                        selectedTab === EXERCISE_TAB ? '$blue8' : '$gray6'
                                    }
                                >
                                    <SizableText
                                        size='$3'
                                        color={selectedTab === EXERCISE_TAB ? '$gray1' : '$gray12'}
                                        fontWeight='bold'
                                    >
                                        Exercise
                                    </SizableText>
                                </Tabs.Tab>
                                <Tabs.Tab
                                    flex={1}
                                    value={VARIATION_TAB}
                                    backgroundColor={
                                        selectedTab === VARIATION_TAB ? '$blue8' : '$gray6'
                                    }
                                >
                                    <SizableText
                                        size='$3'
                                        color={selectedTab === VARIATION_TAB ? '$gray1' : '$gray12'}
                                        fontWeight='bold'
                                    >
                                        Exercise Variation
                                    </SizableText>
                                </Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Content value={EXERCISE_TAB} paddingTop='$space.3'>
                                <CreateExerciseForm />
                            </Tabs.Content>
                            <Tabs.Content value={VARIATION_TAB} paddingTop='$space.3'>
                                <CreateExerciseVariationForm />
                            </Tabs.Content>
                        </Tabs>
                    </ScreenViewWithKeyboard>
                </ModalContent>
            </KeyboardAvoidingView>
        </Modal>
    );
}
