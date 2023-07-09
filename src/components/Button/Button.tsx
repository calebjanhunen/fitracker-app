import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components';

import { type theme } from '../../theme/theme';
import Text from '../Text/Text';

interface Props {
    children: React.ReactNode;
    backgroundColor: keyof typeof theme.colors;
    textColor: keyof typeof theme.fontColors;
    onPress: () => void;
}

const CustomButton = styled(TouchableOpacity)<{
    backgroundColor: Props['backgroundColor'];
    onPress: Props['onPress'];
}>`
    background-color: ${({ backgroundColor, theme }) => theme.colors[backgroundColor]};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-radius: 50px;
`;

export default function Button(props: Props): React.ReactElement {
    return (
        <CustomButton backgroundColor={props.backgroundColor} onPress={props.onPress}>
            <Text variant='button' color={props.textColor}>
                {props.children}
            </Text>
        </CustomButton>
    );
}
