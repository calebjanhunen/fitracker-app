import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';

import { type theme } from '../../theme/theme';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
import { AlertButton, AlertModalContainer, AlertModalOverlay, Blur } from './AlertStyles';

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    title: string;
    desc: string;
    ctaBtn: {
        text: string;
        backgroundColor: keyof typeof theme.colors;
        textColor: keyof typeof theme.fontColors;
    };
    ctaFunction: () => void;
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
                            <Spacer size='xs' />

                            {/* CTA Button */}
                            <AlertButton
                                backgroundColor={props.ctaBtn.backgroundColor}
                                onPress={props.ctaFunction}
                            >
                                <Text variant='button' color={props.ctaBtn.textColor}>
                                    {props.ctaBtn.text}
                                </Text>
                            </AlertButton>
                            <Spacer size='xxs' />

                            {/* Back Button */}
                            <AlertButton
                                backgroundColor='white'
                                borderColor='primary'
                                onPress={() => {
                                    props.setModalVisible(false);
                                }}
                            >
                                <Text variant='button' color='onWhite'>
                                    Back
                                </Text>
                            </AlertButton>
                        </AlertModalContainer>
                    </TouchableWithoutFeedback>
                </Blur>
            </AlertModalOverlay>
        </Modal>
    );
}
