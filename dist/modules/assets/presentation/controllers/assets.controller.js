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
const upload_asset_use_case_1 = require("../../application/use-cases/upload-asset.use-case");
let AssetsController = class AssetsController {
    uploadAssetUseCase;
    constructor(uploadAssetUseCase) {
        this.uploadAssetUseCase = uploadAssetUseCase;
    }
    async testUpload(body) {
        const mockFile = {
            buffer: Buffer.from('fake audio data'),
            originalName: 'test-song.wav',
            mimeType: 'audio/wav',
            size: 68,
        };
        const asset = await this.uploadAssetUseCase.execute({
            ownerId: body.ownerId,
            file: mockFile,
        });
        return {
            id: asset.id,
            originalFileName: asset.originalFileName,
            mimeType: asset.mimeType,
            size: asset.size,
            duration: asset.duration,
            ownerId: asset.ownerId,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
            status: asset.status,
            bpm: asset.bpm,
            key: asset.key,
        };
    }
};
exports.AssetsController = AssetsController;
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "testUpload", null);
exports.AssetsController = AssetsController = __decorate([
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [upload_asset_use_case_1.UploadAssetUseCase])
], AssetsController);
//# sourceMappingURL=assets.controller.js.map