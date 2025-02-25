import React, { Dispatch, SetStateAction, useState } from 'react';
import { ExerciseResponseDto, ExerciseResponseDtoExerciseTypeEnum } from 'src/api/generated';
import { useGetExerciseDetailsV2 } from 'src/api/hooks';
import { IconBtnV2 } from 'src/components/common/buttons';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { SizableText, XStack } from 'tamagui';
import EditExerciseModal from '../edit-exercise-modal/EditExerciseModal';
import { MODAL_TRANSITION_DELAY_MS } from '../ExerciseComponentConstants';
import ExerciseDetailsModalBody from './ExerciseDetailsModalBody';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    exercise: ExerciseResponseDto | null;
}

export default function ExerciseDetailsModal({ isOpen, setIsOpen, exercise }: Props) {
    const [isEditExerciseModalOpen, setIsEditExerciseModalOpen] = useState(false);
    const {
        data: exerciseDetails,
        isLoading,
        error,
    } = useGetExerciseDetailsV2(
        exercise?.id,
        exercise?.exerciseType === ExerciseResponseDtoExerciseTypeEnum.Variation
    );
    if (!exercise) {
        return;
    }

    async function onEditButtonPress() {
        setIsOpen(false);
        await new Promise((resolve) => setTimeout(resolve, MODAL_TRANSITION_DELAY_MS));
        setIsEditExerciseModalOpen(true);
    }

    return (
        <>
            <EditExerciseModal
                isOpen={isEditExerciseModalOpen}
                setIsOpen={setIsEditExerciseModalOpen}
                setIsParentModalOpen={setIsOpen}
                exerciseToEdit={exercise}
            />
            <Modal key='modal' open={isOpen} onOpenChange={setIsOpen}>
                <ModalOverlay key='overlay' onPress={() => setIsOpen(false)} />
                <ModalContent key='content' height='85%' width='90%'>
                    <XStack alignItems='center' justifyContent='space-between' gap='$space.1'>
                        <IconBtnV2
                            iconSize={24}
                            height='auto'
                            backgroundColor='$gray4'
                            onPress={() => setIsOpen(false)}
                            iconName='close-outline'
                        />
                        <SizableText
                            numberOfLines={1}
                            flex={1}
                            fontWeight='bold'
                            textAlign='center'
                        >
                            {exercise.name} ({exercise.equipment})
                        </SizableText>
                        <IconBtnV2
                            iconSize={24}
                            height='auto'
                            backgroundColor='$gray4'
                            onPress={onEditButtonPress}
                            iconName='create-outline'
                            disabled={!exercise.isCustom}
                        />
                    </XStack>
                    <ExerciseDetailsModalBody
                        isLoading={isLoading}
                        error={error}
                        exerciseDetails={exerciseDetails}
                    />
                </ModalContent>
            </Modal>
        </>
    );
}
