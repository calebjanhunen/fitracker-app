import { TouchableOpacity, View } from 'react-native';

import { BlurView } from 'expo-blur';
import styled from 'styled-components';

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

    align-items: center;
`;
