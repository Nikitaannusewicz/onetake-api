"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAssetsUseCase = void 0;
const common_1 = require("@nestjs/common");
const paginated_response_type_1 = require("../../../../common/pipes/types/paginated-response.type");
let ListAssetsUseCase = class ListAssetsUseCase {
    assetRepository;
    constructor(assetRepository) {
        this.assetRepository = assetRepository;
    }
    async execute(query) {
        const filters = {
            status: query.status,
            ownerId: query.ownerId,
            minBpm: query.minBpm,
            maxBpm: query.maxBpm,
        };
        const allFilteredAssets = await this.assetRepository.findAll(filters);
        const skip = ((query.page || 1) - 1) * (query.limit || 10);
        const take = query.limit || 10;
        const paginatedAssets = allFilteredAssets.slice(skip, skip + take);
        return (0, paginated_response_type_1.createPaginatedResponse)(paginatedAssets, allFilteredAssets.length, query.page || 1, take);
    }
};
exports.ListAssetsUseCase = ListAssetsUseCase;
exports.ListAssetsUseCase = ListAssetsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAssetRepository')),
    __metadata("design:paramtypes", [Object])
], ListAssetsUseCase);
//# sourceMappingURL=list-assets.use-case.js.map