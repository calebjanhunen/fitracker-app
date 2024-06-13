import React from 'react';

import { Button, Layout, Text } from '@ui-kitten/components';
import { useLogout } from 'src/hooks/api/auth/useLogout';
import { useUser } from 'src/state/context/user-context';

export default function ProfileScreen(): React.ReactElement {
    const { user } = useUser();
    const { logout } = useLogout();

    function handleLogout(): void {
        void logout();
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Text category='h1'>Hello, {user.username}</Text>
            <Button onPress={handleLogout}>Logout</Button>
        </Layout>
    );
}
