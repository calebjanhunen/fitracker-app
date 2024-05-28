import React from 'react';

import { Layout } from '@ui-kitten/components';

interface Props {
    children: React.ReactNode;
}

export default function PageView({ children }: Props): React.ReactElement {
    return <Layout style={{ flex: 1, paddingHorizontal: 16 }}>{children}</Layout>;
}
