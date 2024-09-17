import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { IErrorResponse } from 'src/api/client';
import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';
import { GET_USER_BY_ID_QUERY_KEY } from 'src/api/user-service/UserApiConfig';
import * as UserApi from 'src/api/user-service/UserApiService';
import { Circle, H3, H5, SizableText, Spinner, View, XStack } from 'tamagui';

export default function Profile() {
    const {
        data: user,
        isLoading,
        error,
    } = useQuery<IUserResponse, IErrorResponse>({
        queryFn: UserApi.getUserById,
        queryKey: [GET_USER_BY_ID_QUERY_KEY],
        staleTime: Infinity,
        gcTime: Infinity,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <SizableText color='$red10' fontWeight='bold'>
                Error getting user: {error.message}
            </SizableText>
        );
    }

    return (
        <View flex={1} alignItems='center' marginTop='$6'>
            <Circle size={150} backgroundColor='$gray10' />
            <H3 paddingTop='$space.4'>
                {user?.firstName} {user?.lastName}
            </H3>
            <XStack gap='$space.2'>
                <H5>XP:</H5>
                <H5>{user?.totalXp}</H5>
            </XStack>
        </View>
    );
}
