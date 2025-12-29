"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetUploadedEvent = void 0;
class AssetUploadedEvent {
    assetId;
    filePath;
    ownerId;
    constructor(assetId, filePath, ownerId) {
        this.assetId = assetId;
        this.filePath = filePath;
        this.ownerId = ownerId;
    }
}
exports.AssetUploadedEvent = AssetUploadedEvent;
//# sourceMappingURL=asset-uploaded.event.js.map