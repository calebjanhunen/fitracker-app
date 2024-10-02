import React, { Dispatch, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { Button, H2, H3, H4, SizableText, View, XStack } from 'tamagui';

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function WorkoutTemplateModal({ isModalOpen, setIsModalOpen }: Props) {
    const [templateHeaderTextWidth, setTemplateHeaderTextWidth] = useState<number>(0);

    return (
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <ModalOverlay
                key='workout-template-modal-overlay'
                onPress={() => setIsModalOpen(false)}
            />
            <ModalContent key='workout-template-modal-content' height='80%' width='80%'>
                <XStack
                    alignItems='center'
                    justifyContent='space-between'
                    marginBottom='$space.4'
                    position='relative'
                >
                    <Button
                        fontWeight='bold'
                        paddingHorizontal='$2'
                        paddingVertical='$1'
                        height='0'
                        onPress={() => setIsModalOpen(false)}
                    >
                        X
                    </Button>
                    <H3
                        onTextLayout={(e) =>
                            setTemplateHeaderTextWidth(e.nativeEvent.lines[0].width)
                        }
                        position='absolute'
                        left='50%'
                        transform={[{ translateX: -templateHeaderTextWidth / 2 }]}
                    >
                        Template Name
                    </H3>
                </XStack>
                <FlatList
                    scrollEnabled={false}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <H4>{item.title}: 3 sets</H4>}
                    ItemSeparatorComponent={() => <View height='$2' />}
                />
                <Button
                    fontWeight='bold'
                    backgroundColor='$color.green8Light'
                    color='white'
                    onPress={() => {}}
                    marginTop='$space.4'
                >
                    Start from template
                </Button>
            </ModalContent>
        </Modal>
    );
}

const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
];
