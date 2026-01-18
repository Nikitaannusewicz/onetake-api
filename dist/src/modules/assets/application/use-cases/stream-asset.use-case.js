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
exports.StreamAssetUseCase = void 0;
const common_1 = require("@nestjs/common");
let StreamAssetUseCase = class StreamAssetUseCase {
    assetRepository;
    fileStorageService;
    constructor(assetRepository, fileStorageService) {
        this.assetRepository = assetRepository;
        this.fileStorageService = fileStorageService;
    }
    async execute(assetId) {
        const asset = await this.assetRepository.findById(assetId);
        if (!asset) {
            throw new common_1.NotFoundException(`Asset with id: ${assetId} not found`);
        }
        const filePath = asset.transcodedFilePath || asset.filePath;
        const mimeType = asset.transcodedFilePath ? 'audio/mpeg' : asset.mimeType;
        const stream = await this.fileStorageService.getStream(filePath);
        return {
            stream,
            mimeType,
            size: asset.size,
            fileName: asset.originalFileName,
        };
    }
};
exports.StreamAssetUseCase = StreamAssetUseCase;
exports.StreamAssetUseCase = StreamAssetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAssetRepository')),
    __param(1, (0, common_1.Inject)('IFileStorageService')),
    __metadata("design:paramtypes", [Object, Object])
], StreamAssetUseCase);
//# sourceMappingURL=stream-asset.use-case.js.map