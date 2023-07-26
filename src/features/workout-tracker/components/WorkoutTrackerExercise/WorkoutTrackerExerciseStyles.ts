import { View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components';

export const ExerciseContainer = styled(View)``;

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
