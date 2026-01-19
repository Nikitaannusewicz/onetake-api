"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessAssetUseCase = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
let ProcessAssetUseCase = class ProcessAssetUseCase {
    assetRepository;
    audioProcessingService;
    fileStorageService;
    constructor(assetRepository, audioProcessingService, fileStorageService) {
        this.assetRepository = assetRepository;
        this.audioProcessingService = audioProcessingService;
        this.fileStorageService = fileStorageService;
    }
    async execute(assetId) {
        console.log(`Processing asset: ${assetId}`);
        const asset = await this.assetRepository.findById(assetId);
        if (!asset) {
            throw new Error(`Asset not found: ${assetId}`);
        }
        asset.markAsProcessing();
        await this.assetRepository.save(asset);
        try {
            const tempDir = '/tmp/onetake-processing';
            await fs.mkdir(tempDir, { recursive: true });
            const inputFile = path.join(tempDir, `${assetId}-input${path.extname(asset.originalFileName)}`);
            const outputFile = path.join(tempDir, `${assetId}-transcoded.mp3`);
            console.log(`Downloading file from MinIO...`);
            const fileBuffer = await this.fileStorageService.getFile(asset.filePath);
            if (!fileBuffer) {
                throw new Error(`File not found in storage`);
            }
            await fs.writeFile(inputFile, fileBuffer);
            console.log(`Downloaded to: ${inputFile}`);
            console.log('Analyzing audio metadata...');
            const metadata = await this.audioProcessingService.analyze(inputFile);
            console.log(`Metadata extracted: `, metadata);
            console.log(`Transcoding to streaming format`);
            const transcodedPath = await this.audioProcessingService.transcode(inputFile, outputFile);
            let transcodedMinioPath;
            if (transcodedPath === inputFile) {
                transcodedMinioPath = asset.filePath;
                console.log(`Using original file (already optimizied)`);
            }
            else {
                console.log(`Uploading transcoded file to MinIO...`);
                const transcodedBuffer = await fs.readFile(transcodedPath);
                const transcodedFileName = `${path.basename(asset.originalFileName, path.extname(asset.originalFileName))}-transcoded.mp3`;
                transcodedMinioPath = await this.fileStorageService.save({
                    originalName: transcodedFileName,
                    buffer: transcodedBuffer,
                    mimeType: 'audio/mpeg',
                    size: transcodedBuffer.length,
                }, 'onetake-transcoded');
                console.log(`Transcoded file uploaded: ${transcodedMinioPath}`);
            }
            asset.markAsReady(transcodedMinioPath, metadata.bpm, metadata.key);
            await this.assetRepository.save(asset);
            console.log(`Processing complete: ${assetId}`);
            await fs.unlink(inputFile).catch(() => { });
            await fs.unlink(outputFile).catch(() => { });
            console.log('Cleaned up temp files');
        }
        catch (error) {
            console.error(`Processing failed for ${assetId}: `, error.message);
            asset.markAsFailed();
            await this.assetRepository.save(asset);
            throw error;
        }
    }
};
exports.ProcessAssetUseCase = ProcessAssetUseCase;
exports.ProcessAssetUseCase = ProcessAssetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IAssetRepository')),
    __param(1, (0, common_1.Inject)('IAudioProcessingService')),
    __param(2, (0, common_1.Inject)('IFileStorageService')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProcessAssetUseCase);
//# sourceMappingURL=process-asset.use-case.js.map