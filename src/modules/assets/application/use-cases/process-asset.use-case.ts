import { Injectable } from "@nestjs/common";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IAudioProcessingInterface, TranscodeOptions } from "../interfaces/audio-processing.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";

@Injectable()
export class ProcessAssetUseCase {
    constructor(
        private readonly assetRepository: IAssetRepository,
        private readonly audioProcessingService: IAudioProcessingInterface,
        private readonly storageService: IFileStorageService,
    ) {}
    
    async execute(assetId: string): Promise<void> {
        
        const asset = await this.assetRepository.findById(assetId);
        if (!asset) {
            throw new Error(`Asset does not exist: ${assetId}`);
        }
        
        try {
            const inputPath = asset.filePath;
            
            const fileExtension = inputPath.split('.').pop()?.toLowerCase();
            if (fileExtension === "mp3") {
                const analysisResult = await this.audioProcessingService.analyze(inputPath);
                asset.markAsReady(
                    inputPath,
                    analysisResult.bpm,
                    analysisResult.key,
                );
                await this.assetRepository.save(asset);
                return;
            }
            const outputPath = `transcoded/${asset.ownerId}/${asset.id}.mp3`;
            
            const transcodeOptions: TranscodeOptions = {
                targetFormat: "mp3",
                bitrate: 128000,
                sampleRate: 44100,
            };
            
            await this.audioProcessingService.transcode(inputPath, outputPath, transcodeOptions)
            
            const analysisResult = await this.audioProcessingService.analyze(inputPath);
            
            asset.markAsReady(
                outputPath,
                analysisResult.bpm,
                analysisResult.key, 
            )
    
            await this.assetRepository.save(asset);
        } catch (error) {
            asset.markAsFailed()
            await this.assetRepository.save(asset);
            console.error(`Failed to process assets ${assetId}`, error);       
        }
    }
}