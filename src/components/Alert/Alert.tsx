import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';

import Text from '../Text/Text';

import { type theme } from '../../theme/theme';
import Button from '../Button/Button';
import Spacer from '../Spacer/Spacer';
import { AlertModalContainer, AlertModalOverlay, Blur } from './AlertStyles';

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    title: string;
    desc: string;
    buttons: buttonProps[];
}

interface buttonProps {
    text: string;
    backgroundColor: keyof typeof theme.colors;
    textColor: keyof typeof theme.fontColors;
}

function buttonDisplay(buttons: buttonProps[]): React.ReactElement {
    return (
        <>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    variant='full'
                    backgroundColor={button.backgroundColor}
                    textColor={button.textColor}
                    onPress={() => {}}
                >
                    {button.text}
                </Button>
            ))}
        </>
    );
}

export default function Alert(props: Props): React.ReactElement {
    return (
        <Modal transparent={true} visible={props.modalVisible}>
            {/* Modal Overlay */}
            <AlertModalOverlay
                activeOpacity={1}
                onPress={() => {
                    props.setModalVisible(false);
                }}
            >
                <Blur intensity={40}>
                    {/* Actual modal window */}
                    <TouchableWithoutFeedback>
                        <AlertModalContainer>
                            <Text variant='headline'>{props.title}</Text>
                            <Spacer size='xs' />
                            <Text variant='body' textAlign='center'>
                                {props.desc}
                            </Text>
                            {buttonDisplay(props.buttons)}
                        </AlertModalContainer>
                    </TouchableWithoutFeedback>
                </Blur>
            </AlertModalOverlay>
        </Modal>
    );
}
