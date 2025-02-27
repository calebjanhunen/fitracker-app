import React, { Dispatch, SetStateAction } from 'react';
import { ExerciseResponseDto } from 'src/api/generated';
import { ScreenViewWithKeyboard } from 'src/components/common';
import { IconBtnV2 } from 'src/components/common/buttons';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { SizableText, XStack } from 'tamagui';
import { MODAL_TRANSITION_DELAY_MS } from '../ExerciseComponentConstants';
import EditExerciseForm from './EditExerciseForm';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setIsParentModalOpen: Dispatch<SetStateAction<boolean>>;
    exerciseToEdit: ExerciseResponseDto;
}

export default function EditExerciseModal({
    isOpen,
    setIsOpen,
    setIsParentModalOpen,
    exerciseToEdit,
}: Props) {
    async function closeModal() {
        setIsOpen(false);
        await new Promise((resolve) => setTimeout(resolve, MODAL_TRANSITION_DELAY_MS));
        setIsParentModalOpen(true);
    }

    return (
        <Modal avoidKeyboard key='edit-exercise-modal' open={isOpen} onOpenChange={setIsOpen}>
            <ModalOverlay key='edit-exercise-overlay' onPress={closeModal} />
            <ModalContent key='edit-exercise-content' padding={0} width='90%' height='50%'>
                <ScreenViewWithKeyboard
                    isFlex={false}
                    paddingVertical='$space.3'
                    paddingHorizontal='$space.4'
                >
                    <XStack
                        alignItems='center'
                        position='relative'
                        justifyContent='center'
                        marginBottom='$space.3'
                    >
                        <IconBtnV2
                            iconSize={20}
                            backgroundColor='$gray7'
                            onPress={closeModal}
                            iconName='close-outline'
                            position='absolute'
                            left={0}
                        />
                        <SizableText size='$6' fontWeight='bold'>
                            Edit Exercise{' '}
                            {exerciseToEdit.exerciseType === 'variation' && 'Variation'}
                        </SizableText>
                    </XStack>
                    {exerciseToEdit.exerciseType === 'exercise' ? (
                        <EditExerciseForm exerciseToEdit={exerciseToEdit} />
                    ) : null}
                </ScreenViewWithKeyboard>
            </ModalContent>
        </Modal>
    );
}
