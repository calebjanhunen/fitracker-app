import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

const CustomView = styled(View)`
    padding: 0 16px;
    flex: 1;
    background-color: ${(props) => props.theme.colors.white};
`;

export default function PageView({ children }: Props): React.ReactElement {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <CustomView>{children}</CustomView>
        </SafeAreaView>
    );
}
