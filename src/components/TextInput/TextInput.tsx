import React from 'react';
import { TextInput as RNTextInput, type TextInputProps } from 'react-native';
import { styled } from 'styled-components';
import { type ThemeType } from '../../theme/theme';

interface Props extends TextInputProps {
    variant: keyof typeof variants;
}

const smallTitle = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.title3}px;
  font-family: ${theme.fonts.regular};
`;

const body = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.body}px;
  font-family: ${theme.fonts.regular};
  padding: ${theme.spacing.xxxs} ${theme.spacing.sm};
  width: 95%;
`;

const variants = {
    smallTitle,
    body,
};

const TextInputComponent = styled(RNTextInput)<{ variant: Props['variant'] }>`
    padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.md};
    ${({ variant, theme }) => variants[variant](theme)}
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: 50px;
`;

export default function TextInput(props: Props): React.ReactElement {
    return (
        <TextInputComponent
            placeholder={props.placeholder}
            variant={props.variant}
            onChangeText={props.onChangeText}
            inputMode={props.inputMode}
            maxLength={props.maxLength}
            textAlign={props.textAlign}
            value={props.value}
        />
    );
}
