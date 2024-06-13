import React from 'react';

import { Button, Layout } from '@ui-kitten/components';
import { useLogout } from 'src/hooks/api/auth/useLogout';

export default function ProfileScreen(): React.ReactElement {
    const { logout } = useLogout();

    function handleLogout(): void {
        void logout();
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    );
}
