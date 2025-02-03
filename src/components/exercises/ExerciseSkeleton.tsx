import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useTheme } from 'tamagui';

export default function ExerciseSkeleton() {
    const theme = useTheme();

    return (
        <ContentLoader
            speed={1}
            width={300}
            height={60} // Adjust based on item height
            viewBox='0 0 300 60'
            foregroundColor={theme.gray6.val}
            backgroundColor={theme.gray3.val}
        >
            {/* Title (Exercise Name) */}
            <Rect x='10' y='10' rx='5' ry='5' width='200' height='20' />

            {/* Subtitle (Body Part) */}
            <Rect x='10' y='40' rx='4' ry='4' width='120' height='14' />
        </ContentLoader>
    );
}
