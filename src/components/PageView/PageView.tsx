import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

const CustomView = styled(View)`
    padding: 0 16px;
`;

export default function PageView({ children }: Props): React.ReactElement {
    return (
        <SafeAreaView>
            <CustomView>{children}</CustomView>
        </SafeAreaView>
    );
}
