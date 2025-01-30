import { useEffect, useState } from 'react';

export function useFilteredData<T>(initialData: T[] | undefined, fieldToFilterBy: keyof T) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<T[]>(initialData ?? []);

    useEffect(() => {
        if (searchQuery && initialData) {
            setFilteredData(
                initialData.filter((d) =>
                    String(d[fieldToFilterBy]).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery]);

    return { searchQuery, setSearchQuery, filteredData };
}
