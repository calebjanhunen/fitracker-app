import React from 'react';
import { IErrorResponse } from 'src/api/client';
import { ExerciseDetailsDto } from 'src/api/generated';
import { SizableText, Spinner, View } from 'tamagui';

interface Props {
    isLoading: boolean;
    error: IErrorResponse | null;
    exerciseDetails: ExerciseDetailsDto | undefined;
}

export default function ExerciseDetailsModalBody({ isLoading, error, exerciseDetails }: Props) {
    if (isLoading) {
        return (
            <View flex={1} alignItems='center' justifyContent='center'>
                <Spinner />
            </View>
        );
    }

    if (error ?? !exerciseDetails) {
        return (
            <View alignItems='center' paddingTop='$space.4'>
                <SizableText textAlign='center' color='$red10' fontWeight='bold'>
                    {error
                        ? `Error occured (${error.statusCode}): ${error.message}`
                        : 'Unexpected error occured. Please try again later.'}
                </SizableText>
            </View>
        );
    }

    return <SizableText>{exerciseDetails.bodyPart}</SizableText>;
}
