"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedResponse = createPaginatedResponse;
function createPaginatedResponse(data, total, page, limit) {
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
//# sourceMappingURL=paginated-response.type.js.map