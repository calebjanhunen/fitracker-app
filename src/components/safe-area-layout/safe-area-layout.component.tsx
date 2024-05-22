import { Layout } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native';

interface Props {
    children: React.ReactNode;
}

export default function SafeAreaLayout({ children }: Props): React.ReactElement {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, paddingHorizontal: 16 }}>{children}</Layout>
        </SafeAreaView>
    );
}
