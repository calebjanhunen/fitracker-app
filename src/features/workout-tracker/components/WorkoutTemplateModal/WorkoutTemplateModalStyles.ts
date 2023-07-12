import { TouchableOpacity, View } from 'react-native';

import IonIcons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { styled } from 'styled-components';

export const ModalOverlay = styled(TouchableOpacity)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled(BlurView)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalView = styled(View)`
    background-color: ${(props) => props.theme.colors.white};
    border-radius: ${(props) => props.theme.borderRadius};
    padding: ${(props) => props.theme.spacing.md};
    width: 90%;
`;

export const ModalHeader = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Icon = styled(IonIcons)`
    color: ${(props) => props.theme.colors.primary};
`;
