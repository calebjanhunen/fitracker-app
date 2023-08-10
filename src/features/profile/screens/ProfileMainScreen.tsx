import React, { useContext } from 'react';

import { Button, PageView, Text } from '../../../components';
import { useAuth } from '../../../hooks/useAuth';
// import { AuthContext } from '../../../services/context/AuthContext';

export default function ProfileMainScreen(): React.ReactElement {
    const { logout } = useAuth();
    // const { user } = useContext(AuthContext);

    return (
        <PageView>
            {/* <Text variant='title'>User: {user.username}</Text> */}
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
