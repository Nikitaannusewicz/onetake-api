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
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const upload_asset_use_case_1 = require("../../application/use-cases/upload-asset.use-case");
const asset_dto_1 = require("../../application/dto/asset.dto");
const platform_express_1 = require("@nestjs/platform-express");
const asset_dto_2 = require("../../application/dto/asset.dto");
const list_assets_use_case_1 = require("../../application/use-cases/list-assets.use-case");
const get_asset_by_id_use_case_1 = require("../../application/use-cases/get-asset-by-id.use-case");
const delete_asset_use_case_1 = require("../../application/use-cases/delete-asset.use-case");
const common_3 = require("@nestjs/common");
const stream_asset_use_case_1 = require("../../application/use-cases/stream-asset.use-case");
let AssetsController = class AssetsController {
    uploadAssetUseCase;
    deleteAssetUseCase;
    listAssetUseCase;
    getAssetByIdUseCase;
    streamAssetUseCase;
    constructor(uploadAssetUseCase, deleteAssetUseCase, listAssetUseCase, getAssetByIdUseCase, streamAssetUseCase) {
        this.uploadAssetUseCase = uploadAssetUseCase;
        this.deleteAssetUseCase = deleteAssetUseCase;
        this.listAssetUseCase = listAssetUseCase;
        this.getAssetByIdUseCase = getAssetByIdUseCase;
        this.streamAssetUseCase = streamAssetUseCase;
    }
    async list(query) {
        const result = await this.listAssetUseCase.execute(query);
        const dtoData = result.data.map(asset => asset_dto_1.AssetDto.fromEntity(asset));
        return {
            data: dtoData,
            meta: result.meta,
        };
    }
    async streamAsset(id, response) {
        const result = await this.streamAssetUseCase.execute(id);
        const encodedFileName = encodeURIComponent(result.fileName);
        response.setHeader('Content-Type', result.mimeType);
        response.setHeader('Content-Length', result.size);
        response.setHeader('Accept-Ranges', 'bytes');
        response.setHeader('Cache-Control', 'public, max-age=3600');
        response.setHeader('Content-Disposition', `inline; filename="${encodedFileName}"`);
        result.stream.pipe(response);
    }
    async getAsset(id) {
        const result = await this.getAssetByIdUseCase.execute(id);
        const assetDto = asset_dto_1.AssetDto.fromEntity(result);
        return assetDto;
    }
    async upload(file, dto) {
        const asset = await this.uploadAssetUseCase.execute({
            ownerId: dto.ownerId,
            file: {
                buffer: file.buffer,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
            },
        });
        return {
            id: asset.id,
            originalFileName: asset.originalFileName,
            mimeType: asset.mimeType,
            size: asset.size,
            duration: asset.duration,
            status: asset.status,
            bpm: asset.bpm,
            key: asset.key,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
            ownerId: asset.ownerId,
        };
    }
    async deleteAsset(id) {
        await this.deleteAssetUseCase.execute(id);
    }
};
exports.AssetsController = AssetsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [asset_dto_1.ListAssetsDto]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/stream'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "streamAsset", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getAsset", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
            new common_2.FileTypeValidator({ fileType: /audio\/(mpeg|wav|mp4)/ }),
        ]
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, asset_dto_2.UploadAssetDto]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "upload", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_3.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "deleteAsset", null);
exports.AssetsController = AssetsController = __decorate([
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [upload_asset_use_case_1.UploadAssetUseCase,
        delete_asset_use_case_1.DeleteAssetUseCase,
        list_assets_use_case_1.ListAssetsUseCase,
        get_asset_by_id_use_case_1.GetAssetByIdUseCase,
        stream_asset_use_case_1.StreamAssetUseCase])
], AssetsController);
//# sourceMappingURL=assets.controller.js.map