import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes in ms
            gcTime: 15 * 60 * 1000, // 15 mins in ms
        },
    },
});
