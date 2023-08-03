import React, { useContext } from 'react';

import { Button, PageView, Text } from '../../../components';
import { AuthContext } from '../../../services/auth/authContext';

export default function ProfileMainScreen(): React.ReactElement {
    const { logout, username } = useContext(AuthContext);
    return (
        <PageView>
            <Text variant='title'>User: {username}</Text>
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    void logout();
                }}
            >
                Logout
            </Button>
        </PageView>
    );
}
