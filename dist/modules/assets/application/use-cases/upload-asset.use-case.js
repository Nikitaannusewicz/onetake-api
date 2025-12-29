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
exports.UploadAssetUseCase = void 0;
const common_1 = require("@nestjs/common");
const entity_1 = require("../../domain/entity");
let UploadAssetUseCase = class UploadAssetUseCase {
    assetRepository;
    fileStorageService;
    audioProcessingService;
    constructor(assetRepository, fileStorageService, audioProcessingService) {
        this.assetRepository = assetRepository;
        this.fileStorageService = fileStorageService;
        this.audioProcessingService = audioProcessingService;
    }
    async execute(command) {
        const asset = entity_1.Asset.create(command.file.originalName, command.file.mimeType, command.file.size, 0, "", command.ownerId);
        let filePath;
        try {
            filePath = await this.fileStorageService.save(command.file);
        }
        catch (error) {
            asset.markAsFailed();
            throw new Error(`Internal server error: ${error.message}`);
        }
        let fileDuration;
        try {
            fileDuration = await this.audioProcessingService.getDuration(filePath);
        }
        catch (error) {
            await this.fileStorageService.delete(filePath);
            asset.markAsFailed();
            throw new Error(`Failed to analyze audio: ${error.message}`);
        }
        asset.filePath = filePath;
        asset.duration = fileDuration;
        asset.markAsProcessing();
        await this.assetRepository.save(asset);
        return asset;
    }
};
exports.UploadAssetUseCase = UploadAssetUseCase;
exports.UploadAssetUseCase = UploadAssetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object, Object])
], UploadAssetUseCase);
//# sourceMappingURL=upload-asset.use-case.js.map