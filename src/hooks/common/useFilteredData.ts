import { useMemo, useState } from 'react';
import { ExerciseResponseDto } from 'src/api/generated';

export function useFilteredExercises(
    initialExercises: ExerciseResponseDto[] | undefined,
    bodyPart: string | undefined,
    equipment: string | undefined
) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    let filteredData = initialExercises;

    filteredData = useMemo(() => {
        if (!bodyPart) {
            return filteredData;
        }

        return filteredData?.filter((e) => e.bodyPart === bodyPart);
    }, [bodyPart, filteredData]);

    filteredData = useMemo(() => {
        if (!equipment) {
            return filteredData;
        }

        return filteredData?.filter((e) => e.equipment === equipment);
    }, [equipment, filteredData]);

    filteredData = useMemo(() => {
        if (!searchQuery) {
            return filteredData;
        }

        return filteredData?.filter((e) =>
            e.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, filteredData]);

    return { searchQuery, setSearchQuery, filteredData };
}
