export interface PaginationResponse<T> {
    resources: T[];
    hasMore: boolean;
    totalCount: number;
}
