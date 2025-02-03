import { useMemo, useState } from 'react';

export function useFilteredData<T>(initialData: T[] | undefined, fieldToFilterBy: keyof T) {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredData = useMemo(() => {
        if (!searchQuery) {
            return initialData;
        }

        return initialData?.filter((d) =>
            String(d[fieldToFilterBy]).toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, initialData]);

    return { searchQuery, setSearchQuery, filteredData };
}
