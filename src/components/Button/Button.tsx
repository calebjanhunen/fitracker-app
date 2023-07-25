import React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import styled from 'styled-components';

import { type theme, type ThemeType } from '../../theme/theme';
import Text from '../Text/Text';

interface Props extends TouchableOpacityProps {
    children: React.ReactNode;
    variant: keyof typeof variants;
    backgroundColor: keyof typeof theme.colors;
    textColor: keyof typeof theme.fontColors;
    borderColor?: keyof typeof theme.colors;
    thin?: boolean;
    onPress: () => void;
}

const full = (theme: ThemeType): string => `
    width: 100%;
    padding: ${theme.spacing.xs} 0;
`;

const small = (theme: ThemeType): string => `
    padding: 8px 24px;
`;

const variants = {
    full,
    small,
};

const CustomButton = styled(TouchableOpacity)<{
    backgroundColor: Props['backgroundColor'];
    variant: Props['variant'];
    onPress: Props['onPress'];
    borderColor: Props['borderColor'];
    thin: Props['thin'];
    disabled: Props['disabled'];
}>`
    background-color: ${({ backgroundColor, theme, disabled }) =>
        disabled ? theme.colors.grey : theme.colors[backgroundColor]};
    ${({ variant, theme }) => variants[variant](theme)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    ${({ theme, borderColor }) =>
        borderColor ? `border: 1px solid ${theme.colors[borderColor]};` : ''}
    ${({ theme, thin }) => (thin ? `padding: ${theme.spacing.xxxs} 0;` : '')}
`;

export default function Button(props: Props): React.ReactElement {
    return (
        <CustomButton
            backgroundColor={props.backgroundColor}
            onPress={props.onPress}
            variant={props.variant}
            borderColor={props.borderColor}
            thin={props.thin}
            disabled={props.disabled}
        >
            <Text variant='button' color={props.textColor}>
                {props.children}
            </Text>
        </CustomButton>
    );
}
