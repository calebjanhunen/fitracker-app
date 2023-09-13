import { useQuery, type QueryKey } from '@tanstack/react-query';

interface ReturnType<TReturn> {
    data: TReturn | undefined;
    isLoading: boolean;
    isError: boolean;
    initQuery: () => Promise<void>;
}

export default function useCustomQuery<TReturn>(
    queryKey: QueryKey,
    queryFn: () => Promise<TReturn>,
    runOnMount: boolean
): ReturnType<TReturn> {
    const { data, refetch, isLoading, error, isError } = useQuery(queryKey, queryFn, {
        enabled: runOnMount,
    });

    async function initQuery(): Promise<void> {
        await refetch();
    }

    if (isError) {
        alert(error);
    }

    return { data, isLoading, isError, initQuery };
}
