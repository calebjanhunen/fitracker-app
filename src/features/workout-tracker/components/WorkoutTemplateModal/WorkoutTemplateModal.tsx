import React, { useState, type Dispatch, type SetStateAction } from 'react';
import {
    FlatList,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    type ListRenderItem,
} from 'react-native';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';

import { BottomMenu, Button, Spacer, Text } from '../../../../components';
import { useWorkoutExercises } from '../../../../hooks/useWorkoutExercises';
import {
    type WorkoutTemplate,
    type WorkoutTemplateExercise,
} from '../../../../interfaces/WorkoutTemplate';
import {
    Icon,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    ModalView,
} from './WorkoutTemplateModalStyles';

interface Props {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    workoutTemplate: WorkoutTemplate;
    isWorkoutTrackerActive: boolean;
    setIsWorkoutTrackerActive: Dispatch<SetStateAction<boolean>>;
    workoutTrackerModalRef: React.RefObject<BottomSheetModal>;
}

const renderExercise: ListRenderItem<WorkoutTemplateExercise> = ({ item }) => (
    <Text variant='body'>
        {item.numSets} x {item.name}
    </Text>
);

function openWorkoutTrackerModalWithTemplate(
    workoutTemplate: WorkoutTemplate,
    deleteAllExercises: () => void,
    setIsWorkoutTrackerActive: Dispatch<SetStateAction<boolean>>,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    workoutTrackerModalRef: React.RefObject<BottomSheetModal>
): void {
    deleteAllExercises();

    // TODO: Fix adding exercises
    // workoutTemplate.exercises.forEach((exercise) => {
    //     dispatchExercises({ type: ExercisesActionsTypes.ADD_EXERCISE, payload: exercise });
    // });
    setIsWorkoutTrackerActive(true);
    setModalVisible(false);
    workoutTrackerModalRef.current?.present();
}

export default function WorkoutTemplateModal(props: Props): React.ReactElement {
    const { deleteAllExercises } = useWorkoutExercises();
    const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);

    const closeModal = (): void => {
        props.setModalVisible(false);
    };

    return (
        <Modal visible={props.modalVisible} animationType='fade' transparent={true}>
            <BottomMenu
                moreOptionsVisible={moreOptionsVisible}
                setMoreOptionsVisible={setMoreOptionsVisible}
                menuItemProps={[
                    { icon: 'create-outline', text: 'Edit Template' },
                    { icon: 'trash-outline', text: 'Delete Template' },
                ]}
            />
            <ModalOverlay onPress={closeModal} activeOpacity={1}>
                <ModalContainer intensity={40}>
                    <TouchableWithoutFeedback>
                        <ModalView>
                            <ModalHeader>
                                <Text variant='headline'>{props.workoutTemplate.name}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setMoreOptionsVisible(true);
                                    }}
                                >
                                    <Icon name='ellipsis-horizontal' size={34} />
                                </TouchableOpacity>
                            </ModalHeader>
                            <Spacer size='xs' />
                            <FlatList
                                data={props.workoutTemplate.exercises}
                                renderItem={renderExercise}
                                ItemSeparatorComponent={() => <Spacer size='xs' />}
                            />
                            <Spacer size='xs' />
                            {!props.isWorkoutTrackerActive && (
                                <Button
                                    variant='full'
                                    backgroundColor='primary'
                                    textColor='white'
                                    onPress={() => {
                                        openWorkoutTrackerModalWithTemplate(
                                            props.workoutTemplate,
                                            deleteAllExercises,
                                            props.setIsWorkoutTrackerActive,
                                            props.setModalVisible,
                                            props.workoutTrackerModalRef
                                        );
                                    }}
                                >
                                    START WORKOUT ({props.workoutTemplate.name})
                                </Button>
                            )}
                        </ModalView>
                    </TouchableWithoutFeedback>
                </ModalContainer>
            </ModalOverlay>
        </Modal>
    );
}
