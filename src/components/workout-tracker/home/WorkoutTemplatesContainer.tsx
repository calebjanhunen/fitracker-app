import React from 'react';
import { IErrorResponse } from 'src/api/client';
import { SizableText, Spinner } from 'tamagui';

interface Props {
    isLoading: boolean;
    error: IErrorResponse | null;
    children: React.ReactNode;
    numResults: number;
}

export default function WorkoutTemplatesContainer({
    isLoading,
    error,
    children,
    numResults,
}: Props) {
    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <SizableText color='$red10' textAlign='center'>
                Error getting workout templates: {error.message}
            </SizableText>
        );
    }

    if (numResults === 0) {
        return (
            <SizableText fontWeight='bold' textAlign='center' color='$gray10'>
                No Workout Templates
            </SizableText>
        );
    }

    return <>{children}</>;
}
