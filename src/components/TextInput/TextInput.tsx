import React from 'react';
import { TextInput as RNTextInput, type TextInputProps } from 'react-native';
import { styled } from 'styled-components';
import { type ThemeType, type theme } from '../../theme/theme';

interface Props extends TextInputProps {
    variant: keyof typeof variants;
    paddingTopAndBot?: keyof typeof theme.spacing;
    width?: string;
}

const smallTitle = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.title3}px;
  font-family: ${theme.fonts.regular};
  padding: ${theme.spacing.xxs} ${theme.spacing.md};
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

const TextInputComponent = styled(RNTextInput)<{
    variant: Props['variant'];
    paddingTopAndBot: Props['paddingTopAndBot'];
}>`
    ${({ variant, theme }) => variants[variant](theme)}
    ${({ theme, paddingTopAndBot }) =>
        paddingTopAndBot ? `padding: ${theme.spacing[paddingTopAndBot]} ${theme.spacing.md};` : ''}
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: 50px;
`;

export default function TextInput(props: Props): React.ReactElement {
    return (
        <TextInputComponent
            style={props.style}
            placeholder={props.placeholder}
            variant={props.variant}
            onChangeText={props.onChangeText}
            inputMode={props.inputMode}
            maxLength={props.maxLength}
            textAlign={props.textAlign}
            value={props.value}
            paddingTopAndBot={props.paddingTopAndBot}
            secureTextEntry={props.secureTextEntry}
            autoComplete={props.autoComplete}
            autoCapitalize={props.autoCapitalize}
            autoCorrect={props.autoCorrect}
            keyboardType={props.keyboardType}
        />
    );
}
