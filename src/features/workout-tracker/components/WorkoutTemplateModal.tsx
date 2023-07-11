import React from 'react';
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import IonIcons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { styled } from 'styled-components';

import { Button, Spacer, Text } from '../../../components';
import { type WorkoutTemplate } from '../../../interfaces/WorkoutTemplate';

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    workoutTemplate: WorkoutTemplate;
}

const ModalContainer = styled(BlurView)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalView = styled(View)`
    background-color: ${(props) => props.theme.colors.white};
    border-radius: ${(props) => props.theme.borderRadius};
    padding: ${(props) => props.theme.spacing.md};
    width: 90%;
`;

const ModalHeader = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Icon = styled(IonIcons)`
    color: ${(props) => props.theme.colors.primary};
`;

export default function WorkoutTemplateModal(props: Props): React.ReactElement {
    return (
        <Modal visible={props.modalVisible} animationType='fade' transparent={true}>
            <TouchableOpacity
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', flex: 1 }}
                onPress={() => {
                    props.setModalVisible(false);
                }}
                activeOpacity={1}
            >
                <ModalContainer intensity={40}>
                    <TouchableWithoutFeedback>
                        <ModalView>
                            <ModalHeader>
                                <Text variant='headline'>{props.workoutTemplate.name}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        // TODO: Open more options menu
                                    }}
                                >
                                    <Icon name='ellipsis-horizontal' size={34} />
                                </TouchableOpacity>
                            </ModalHeader>
                            <Spacer size='xs' />
                            <FlatList
                                data={props.workoutTemplate.exercises}
                                renderItem={({ item }) => (
                                    <Text variant='body'>
                                        {item.sets} x {item.name}
                                    </Text>
                                )}
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
            </TouchableOpacity>
        </Modal>
    );
}
