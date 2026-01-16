export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare function createPaginatedResponse<T>(data: T[], total: number, page: number, limit: number): PaginatedResponse<T>;
