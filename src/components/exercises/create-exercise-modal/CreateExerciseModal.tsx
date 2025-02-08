import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { SizableText, Tabs } from 'tamagui';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EXERCISE_TAB = 'exercise';
const VARIATION_TAB = 'variation';

export default function CreateExerciseModal({ isOpen, setIsOpen }: Props) {
    const [selectedTab, setSelectedTab] = useState(EXERCISE_TAB);
    return (
        <Modal key='modal' open={isOpen} onOpenChange={setIsOpen}>
            <ModalOverlay key='overlay' onPress={() => setIsOpen(false)} />
            <ModalContent key='content' height='60%' width='90%'>
                <SizableText size='$6' fontWeight='bold' paddingBottom='$space.3'>
                    Create Exercise {selectedTab === VARIATION_TAB ? 'Variation' : ''}
                </SizableText>
                <Tabs
                    orientation='horizontal'
                    flexDirection='column'
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    flex={1}
                >
                    <Tabs.List>
                        <Tabs.Tab
                            flex={1}
                            value={EXERCISE_TAB}
                            backgroundColor={selectedTab === EXERCISE_TAB ? '$blue8' : '$gray6'}
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
                            backgroundColor={selectedTab === VARIATION_TAB ? '$blue8' : '$gray6'}
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
                    <Tabs.Content
                        flex={1}
                        value={EXERCISE_TAB}
                        paddingTop='$space.3'
                    ></Tabs.Content>
                    <Tabs.Content
                        flex={1}
                        value={VARIATION_TAB}
                        paddingTop='$space.3'
                    ></Tabs.Content>
                </Tabs>
            </ModalContent>
        </Modal>
    );
}
