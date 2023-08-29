import { View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

export const ExerciseContainer = styled(View)``;

export const Row = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Header = styled(TouchableOpacity)<{ isActive: boolean }>`
    background-color: ${(props) => props.theme.colors.white};
    padding: ${(props) => props.theme.spacing.xxxs} 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    ${({ isActive }) => isActive && `box-shadow: 5px 5px 15px #000000;`};
`;

export const Icon = styled(Ionicons)`
    color: ${(props) => props.theme.colors.error};
`;

export const FlexView = styled(View)<{ flex: number }>`
    flex: ${(props) => props.flex};
    align-items: center;
`;
