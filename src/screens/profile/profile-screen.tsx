import React from 'react';

import { Button, Layout } from '@ui-kitten/components';
import { useAuth } from 'src/hooks/useAuth';

export default function ProfileScreen(): React.ReactElement {
    const { logout } = useAuth();

    function handleLogout(): void {
        void logout();
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    );
}
