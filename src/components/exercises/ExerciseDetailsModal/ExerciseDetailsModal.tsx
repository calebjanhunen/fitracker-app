import IonIcons from '@expo/vector-icons/Ionicons';
import React, { Dispatch, SetStateAction } from 'react';
import { ExerciseResponseDto } from 'src/api/generated';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { Button, SizableText, XStack } from 'tamagui';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    exercise: ExerciseResponseDto | null;
}

export default function ExerciseDetailsModal({ isOpen, setIsOpen, exercise }: Props) {
    if (!exercise) {
        return;
    }

    return (
        <Modal key='modal' open={isOpen} onOpenChange={setIsOpen}>
            <ModalOverlay key='overlay' onPress={() => setIsOpen(false)} />
            <ModalContent key='content' height='85%' width='90%'>
                <XStack alignItems='center' justifyContent='space-between' gap='$space.1'>
                    <Button
                        paddingHorizontal='$2'
                        paddingVertical='$1'
                        height='auto'
                        onPress={() => setIsOpen(false)}
                    >
                        <IonIcons name='close-outline' size={24} />
                    </Button>
                    <SizableText numberOfLines={1} flex={1} fontWeight='bold' textAlign='center'>
                        {exercise.name} ({exercise.equipment})
                    </SizableText>
                    <Button
                        paddingHorizontal='$2'
                        paddingVertical='$1'
                        height='auto'
                        onPress={() => {}}
                    >
                        <IonIcons name='create-outline' size={24} />
                    </Button>
                </XStack>
            </ModalContent>
        </Modal>
    );
}
