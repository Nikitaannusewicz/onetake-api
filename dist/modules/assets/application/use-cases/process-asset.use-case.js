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
exports.ProcessAssetUseCase = void 0;
const common_1 = require("@nestjs/common");
let ProcessAssetUseCase = class ProcessAssetUseCase {
    assetRepository;
    audioProcessingService;
    storageService;
    constructor(assetRepository, audioProcessingService, storageService) {
        this.assetRepository = assetRepository;
        this.audioProcessingService = audioProcessingService;
        this.storageService = storageService;
    }
    async execute(assetId) {
        const asset = await this.assetRepository.findById(assetId);
        if (!asset) {
            throw new Error(`Asset does not exist: ${assetId}`);
        }
        try {
            const inputPath = asset.filePath;
            const outputPath = `transcoded/${asset.ownerId}/${asset.id}.mp3`;
            const fileExtension = inputPath.split('.').pop()?.toLowerCase();
            if (fileExtension === "mp3") {
                const analysisResult = await this.audioProcessingService.analyze(inputPath);
                asset.markAsReady(outputPath, analysisResult.bpm, analysisResult.key);
                await this.assetRepository.save(asset);
                return;
            }
            const transcodeOptions = {
                targetFormat: "mp3",
                bitrate: 128000,
                sampleRate: 44100,
            };
            await this.audioProcessingService.transcode(inputPath, outputPath, transcodeOptions);
            const analysisResult = await this.audioProcessingService.analyze(inputPath);
            asset.markAsReady(outputPath, analysisResult.bpm, analysisResult.key);
            await this.assetRepository.save(asset);
        }
        catch (error) {
            asset.markAsFailed();
            await this.assetRepository.save(asset);
            throw new Error(`Failed to process asset: ${error.message}`);
        }
    }
};
exports.ProcessAssetUseCase = ProcessAssetUseCase;
exports.ProcessAssetUseCase = ProcessAssetUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProcessAssetUseCase);
//# sourceMappingURL=process-asset.use-case.js.map