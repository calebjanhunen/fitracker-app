import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styled from 'styled-components';
import { Text } from '../../../../components';

interface Props {
    navigation: any;
}

const SignupFooterContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${(props) => props.theme.spacing.xxxs};
`;

export default function SignupFooter({ navigation }: Props): React.ReactElement {
    return (
        <SignupFooterContainer>
            <Text variant='body'>Already have an account?</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <Text variant='body' color='onWhite'>
                    Login
                </Text>
            </TouchableOpacity>
        </SignupFooterContainer>
    );
}
