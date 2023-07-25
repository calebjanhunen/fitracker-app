import { TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components';

import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { type theme } from '../../../../theme/theme';

// Add Exercise Modal styles

export const ModalOverlay = styled(TouchableOpacity)`
    flex: 1;
`;

export const Blur = styled(BlurView)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
`;

export const ModalContainer = styled(View)`
    background-color: ${(props) => props.theme.colors.white};
    border-radius: ${(props) => props.theme.borderRadius};
    width: 90%;
    height: 80%;
`;

export const PaddedContainer = styled(View)`
    padding: 0 ${(props) => props.theme.spacing.md};
    padding-top: ${(props) => props.theme.spacing.md};
`;

export const ModalHeader = styled(View)`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Icon = styled(Ionicons)`
    color: ${(props) => props.theme.colors.error};
`;

// Exercise component styles

export const ExerciseContainer = styled(TouchableOpacity)<{
    backgroundColor: keyof typeof theme.colors;
}>`
    width: 100%;
    background-color: ${({ theme, backgroundColor }) => theme.colors[backgroundColor]};
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.xs};
`;
