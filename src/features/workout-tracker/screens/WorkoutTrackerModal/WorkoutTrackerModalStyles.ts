import { Animated, TouchableOpacity, View } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import styled from 'styled-components';

export const shadowStyle = {
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
};

export const CustomBottomSheetModal = styled(BottomSheetModal)<{ sheetHidden: boolean }>`
    border-radius: ${(props) => props.theme.borderRadius};
    ${(props) => (props.sheetHidden ? 'display: none;' : '')}
    background-color: ${(props) => props.theme.colors.white};
`;

export const WorkoutModalView = styled(View)`
    flex: 1;
`;

export const PaddedContainer = styled(View)`
    padding: 0 ${(props) => props.theme.spacing.md};
`;

export const Header = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderButton = styled(TouchableOpacity)<{ backgroundColor: 'error' | 'success' }>`
    background-color: ${(props) => props.theme.colors[props.backgroundColor]};

    align-items: center;
    justify-content: center;
    border-radius: 100px;
    width: 35%;
    padding: 5px 0;
`;

export const Line = styled(Animated.View)`
    height: 1px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.grey};
`;
