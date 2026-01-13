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

export function createPaginatedResponse<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);
    
    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages,
        },
    }; 
}