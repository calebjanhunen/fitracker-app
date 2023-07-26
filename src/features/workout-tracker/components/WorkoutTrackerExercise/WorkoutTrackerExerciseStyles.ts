import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components';

export const ExerciseContainer = styled(View)``;

export const ExerciseSetContainer = styled(View)`
    background-color: ${(props) => props.theme.colors.white};
`;

export const Row = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Icon = styled(Ionicons)`
    color: ${(props) => props.theme.colors.error};
`;

export const FlexView = styled(View)<{ flex: number }>`
    flex: ${(props) => props.flex};
    align-items: center;
`;

export const DeleteSetContainer = styled(View)`
    background-color: ${(props) => props.theme.colors.error};
    justify-content: center;
    align-items: flex-end;
    padding-right: ${(props) => props.theme.spacing.xxs};
    flex: 1;
`;

export const DeleteSetText = styled(Text)`
    font-size: ${(props) => props.theme.fontSize.body}px;
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.fontColors.white};
`;
