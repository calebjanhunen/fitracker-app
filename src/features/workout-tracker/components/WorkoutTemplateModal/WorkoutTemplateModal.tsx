import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    type ListRenderItem,
} from 'react-native';

import { BottomMenu, Button, Spacer, Text } from '../../../../components';
import { type Exercise } from '../../../../interfaces/Exercise';
import { type WorkoutTemplate } from '../../../../interfaces/WorkoutTemplate';
import {
    Icon,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    ModalView,
} from './WorkoutTemplateModalStyles';

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    workoutTemplate: WorkoutTemplate;
}

const renderExercise: ListRenderItem<Exercise> = ({ item }) => (
    <Text variant='body'>
        {item.sets} x {item.name}
    </Text>
);

export default function WorkoutTemplateModal(props: Props): React.ReactElement {
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
                            <Button
                                variant='full'
                                backgroundColor='primary'
                                textColor='white'
                                onPress={() => {
                                    // TODO: Link to workout modal
                                }}
                            >
                                START WORKOUT ({props.workoutTemplate.name})
                            </Button>
                        </ModalView>
                    </TouchableWithoutFeedback>
                </ModalContainer>
            </ModalOverlay>
        </Modal>
    );
}
