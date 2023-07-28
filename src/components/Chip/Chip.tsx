import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { styled } from 'styled-components';
import Text from '../Text/Text';

interface Props {
    text: string;
    onPress: () => void;
    isSelected: boolean;
}

const ChipComponent = styled(TouchableOpacity)<{ isSelected: Props['isSelected'] }>`
    background-color: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.primaryTranslucent : theme.colors.white};
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25); */
    border: 1px solid
        ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.black)};
    padding: ${(props) => props.theme.spacing.xxxs} ${(props) => props.theme.spacing.xxs};
    margin-bottom: 15px;
    border-radius: 100px;
`;

export const ChipContainer = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing.xs};
    justify-content: center;
`;

export default function Chip(props: Props): React.ReactElement {
    return (
        <ChipComponent activeOpacity={1} onPress={props.onPress} isSelected={props.isSelected}>
            <Text variant='body'>{props.text}</Text>
        </ChipComponent>
    );
}
