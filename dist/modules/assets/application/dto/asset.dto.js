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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAssetsDto = exports.UploadAssetDto = exports.AssetDto = void 0;
const entity_1 = require("../../domain/entity");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AssetDto {
    id;
    originalFileName;
    mimeType;
    size;
    duration;
    status;
    bpm;
    key;
    createdAt;
    updatedAt;
    ownerId;
    streamUrl;
    static fromEntity(asset, streamURL) {
        const dto = new AssetDto();
        dto.id = asset.id;
        dto.originalFileName = asset.originalFileName;
        dto.mimeType = asset.mimeType;
        dto.size = asset.size;
        dto.duration = asset.duration;
        dto.status = asset.status;
        dto.bpm = asset.bpm;
        dto.key = asset.key;
        dto.createdAt = asset.createdAt;
        dto.updatedAt = asset.updatedAt;
        dto.ownerId = asset.ownerId;
        dto.streamUrl = streamURL;
        return dto;
    }
    static fromEntityWithUrl(asset, fileStorageService) {
        let streamUrl;
        if (asset.status == entity_1.AssetStatus.READY && asset.transcodedFilePath) {
            streamUrl = fileStorageService.getUrl(asset.transcodedFilePath);
        }
        return AssetDto.fromEntity(asset, streamUrl);
    }
}
exports.AssetDto = AssetDto;
class UploadAssetDto {
    ownerId;
}
exports.UploadAssetDto = UploadAssetDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadAssetDto.prototype, "ownerId", void 0);
class ListAssetsDto {
    status;
    ownerId;
    minBpm;
    maxBpm;
    page = 1;
    limit = 10;
}
exports.ListAssetsDto = ListAssetsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(entity_1.AssetStatus),
    __metadata("design:type", String)
], ListAssetsDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListAssetsDto.prototype, "ownerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ListAssetsDto.prototype, "minBpm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ListAssetsDto.prototype, "maxBpm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ListAssetsDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ListAssetsDto.prototype, "limit", void 0);
//# sourceMappingURL=asset.dto.js.map