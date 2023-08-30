import { TouchableOpacity, View } from 'react-native';

import styled from 'styled-components';

export const ExerciseContainer = styled(View)`
    flex: 1;
`;

export const Row = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Header = styled(View)<{ isActive: boolean }>`
    background-color: ${(props) => props.theme.colors.white};
    padding: ${(props) => props.theme.spacing.xxxs} ${(props) => props.theme.spacing.xxxs};
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    ${({ isActive }) => isActive && `box-shadow: 5px 5px 15px #000000;`};
`;

export const ReorderPressable = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

export const FlexView = styled(View)<{ flex: number }>`
    flex: ${(props) => props.flex};
    align-items: center;
`;
