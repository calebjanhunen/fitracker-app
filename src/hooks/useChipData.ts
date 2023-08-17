import { useEffect, useState } from 'react';

import { type Tables } from '../interfaces/Tables';
import { apiClient } from '../services/api/utils/config';

interface ChipDataReturnType {
    chips: Array<Tables<'fitness_goals' | 'workout_types'>>;
    isLoading: boolean;
}

export function useChipData(
    fitnessGoalsOrWorkoutTypes: 'fitness_goals' | 'workout_types'
): ChipDataReturnType {
    const [chips, setChips] = useState<Array<Tables<'fitness_goals' | 'workout_types'>>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getChipData(): Promise<void> {
        setIsLoading(true);
        try {
            const { data, error } = await apiClient
                .from(`${fitnessGoalsOrWorkoutTypes}`)
                .select('*');
            if (error) {
                console.error(error);
            }
            if (data) {
                setChips(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        void getChipData();
    }, []);

    return { chips, isLoading };
}
