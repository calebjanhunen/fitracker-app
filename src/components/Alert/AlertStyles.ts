import { TouchableOpacity, View } from 'react-native';

import { BlurView } from 'expo-blur';
import styled from 'styled-components';
import { type theme } from '../../theme/theme';

export const AlertModalOverlay = styled(TouchableOpacity)`
    flex: 1;
`;

export const Blur = styled(BlurView)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
`;

export const AlertModalContainer = styled(View)`
    background-color: ${(props) => props.theme.colors.white};
    border-radius: ${(props) => props.theme.borderRadius};
    padding: ${(props) => props.theme.spacing.md};
    width: 80%;
    align-items: center;
`;

export const AlertButton = styled(TouchableOpacity)<{
    backgroundColor: keyof typeof theme.colors;
    borderColor?: keyof typeof theme.colors;
}>`
    background-color: ${(props) => props.theme.colors[props.backgroundColor]};
    ${(props) =>
        props.borderColor ? `border: 1px solid ${props.theme.colors[props.borderColor]}` : ''};
    width: 100%;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.theme.spacing.xxxs} 0;
`;
