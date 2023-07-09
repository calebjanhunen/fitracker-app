import React from 'react';
import { Text as DefaultText } from 'react-native';
import styled from 'styled-components';
import { type theme, type ThemeType } from '../../theme/theme';

interface Props {
    children: React.ReactNode;
    variant: keyof typeof variants;
    color?: keyof typeof theme.fontColors;
}

const title = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.title1}px;
  font-family: ${theme.fonts.regular};
`;

const headline = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.headline}px;
  font-family: ${theme.fonts.semibold};
`;

const subhead = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.subhead}px;
  font-family: ${theme.fonts.regular};
`;

const body = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.body}px;
  font-family: ${theme.fonts.regular};
`;

const button = (theme: ThemeType): string => `
  font-size: ${theme.fontSize.button}px;
  font-family: ${theme.fonts.bold};
  text-transform: uppercase;
`;

const variants = {
    title,
    headline,
    subhead,
    body,
    button,
};

const CustomText = styled(DefaultText)<{ variant: Props['variant']; color: Props['color'] }>`
    ${({ variant, theme }) => variants[variant](theme)};
    color: ${({ color, theme }) => (color ? theme.fontColors[color] : theme.fontColors.primary)};
`;

export default function Text(props: Props): React.ReactElement {
    return (
        <CustomText variant={props.variant} color={props.color}>
            {props.children}
        </CustomText>
    );
}
