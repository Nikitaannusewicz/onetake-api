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
exports.UploadAssetUseCase = void 0;
const common_1 = require("@nestjs/common");
const entity_1 = require("../../domain/entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const asset_uploaded_event_1 = require("../events/asset-uploaded.event");
const common_2 = require("@nestjs/common");
let UploadAssetUseCase = class UploadAssetUseCase {
    assetRepository;
    fileStorageService;
    eventEmitter;
    constructor(assetRepository, fileStorageService, eventEmitter) {
        this.assetRepository = assetRepository;
        this.fileStorageService = fileStorageService;
        this.eventEmitter = eventEmitter;
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
        asset.filePath = filePath;
        asset.markAsProcessing();
        await this.assetRepository.save(asset);
        this.eventEmitter.emit('asset.uploaded', new asset_uploaded_event_1.AssetUploadedEvent(asset.id, asset.filePath, asset.ownerId));
        return asset;
    }
};
exports.UploadAssetUseCase = UploadAssetUseCase;
exports.UploadAssetUseCase = UploadAssetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('IAssetRepository')),
    __param(1, (0, common_2.Inject)('IFileStorageService')),
    __metadata("design:paramtypes", [Object, Object, event_emitter_1.EventEmitter2])
], UploadAssetUseCase);
//# sourceMappingURL=upload-asset.use-case.js.map