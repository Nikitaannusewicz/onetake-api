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
exports.AssetUploadedListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const asset_uploaded_event_1 = require("../events/asset-uploaded.event");
const process_asset_use_case_1 = require("../use-cases/process-asset.use-case");
let AssetUploadedListener = class AssetUploadedListener {
    processAssetUseCase;
    constructor(processAssetUseCase) {
        this.processAssetUseCase = processAssetUseCase;
    }
    async handleAssetUploaded(uploadEvent) {
        try {
            await this.processAssetUseCase.execute(uploadEvent.assetId);
        }
        catch (error) {
            console.error(`Listener failed`, error);
        }
    }
};
exports.AssetUploadedListener = AssetUploadedListener;
__decorate([
    (0, event_emitter_1.OnEvent)('asset.uploaded', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [asset_uploaded_event_1.AssetUploadedEvent]),
    __metadata("design:returntype", Promise)
], AssetUploadedListener.prototype, "handleAssetUploaded", null);
exports.AssetUploadedListener = AssetUploadedListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [process_asset_use_case_1.ProcessAssetUseCase])
], AssetUploadedListener);
//# sourceMappingURL=asset-uploaded.listener.js.map