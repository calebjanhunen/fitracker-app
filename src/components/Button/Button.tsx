import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components';

import { type theme, type ThemeType } from '../../theme/theme';
import Text from '../Text/Text';

interface Props {
    children: React.ReactNode;
    variant: keyof typeof variants;
    backgroundColor: keyof typeof theme.colors;
    textColor: keyof typeof theme.fontColors;
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
}>`
    background-color: ${({ backgroundColor, theme }) => theme.colors[backgroundColor]};
    ${({ variant, theme }) => variants[variant](theme)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
`;

export default function Button(props: Props): React.ReactElement {
    return (
        <CustomButton
            backgroundColor={props.backgroundColor}
            onPress={props.onPress}
            variant={props.variant}
        >
            <Text variant='button' color={props.textColor}>
                {props.children}
            </Text>
        </CustomButton>
    );
}
