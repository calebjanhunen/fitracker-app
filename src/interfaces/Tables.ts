import { type Database } from './Database';

// Generic type used for typing various tables in database
export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];
