"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = exports.AssetStatus = void 0;
const uuid_1 = require("uuid");
var AssetStatus;
(function (AssetStatus) {
    AssetStatus["UPLOADED"] = "UPLOADED";
    AssetStatus["PROCESSING"] = "PROCESSING";
    AssetStatus["READY"] = "READY";
    AssetStatus["FAILED"] = "FAILED";
})(AssetStatus || (exports.AssetStatus = AssetStatus = {}));
class Asset {
    id;
    originalFileName;
    mimeType;
    size;
    duration;
    filePath;
    transcodedFilePath;
    ownerId;
    createdAt;
    updatedAt;
    status;
    bpm;
    key;
    constructor(id, originalFileName, mimeType, size, duration, filePath, ownerId, createdAt, updatedAt, status, transcodedFilePath, bpm, key) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.mimeType = mimeType;
        this.size = size;
        this.duration = duration;
        this.filePath = filePath;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.transcodedFilePath = transcodedFilePath;
        this.bpm = bpm;
        this.key = key;
    }
    static create(originalFileName, mimeType, size, duration, filePath, ownerId) {
        const now = new Date();
        return new Asset((0, uuid_1.v4)(), originalFileName, mimeType, size, duration, filePath, ownerId, now, now, AssetStatus.UPLOADED);
    }
    markAsProcessing() {
        if (this.status !== AssetStatus.UPLOADED) {
            throw new Error('Asset must be in UPLOADED status to start processing.');
        }
        this.status = AssetStatus.PROCESSING;
        this.updatedAt = new Date();
    }
    markAsReady(transcodedFilePath, bpm, key) {
        if (this.status !== AssetStatus.PROCESSING) {
            throw new Error('Asset must be in PROCESSING status to be marked as ready.');
        }
        this.transcodedFilePath = transcodedFilePath;
        this.bpm = bpm;
        this.key = key;
        this.status = AssetStatus.READY;
        this.updatedAt = new Date();
    }
    markAsFailed() {
        if (this.status === AssetStatus.FAILED) {
            throw new Error('Asset already of status FAILED');
        }
        this.status = AssetStatus.FAILED;
        this.updatedAt = new Date();
    }
}
exports.Asset = Asset;
//# sourceMappingURL=entity.js.map