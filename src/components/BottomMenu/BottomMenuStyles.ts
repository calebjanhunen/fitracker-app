import { TouchableOpacity, View } from 'react-native';

import IonIcons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components';

export const MenuContainer = styled(View)`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 16px 34px 16px;
`;

export const MenuItemSeperator = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.grey};
`;

export const MenuItemContainer = styled(TouchableOpacity)`
    padding: ${(props) => props.theme.spacing.md};
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
`;

export const Icon = styled(IonIcons)`
    color: ${(props) => props.theme.colors.primary};
`;
