import { Inject, Injectable } from "@nestjs/common";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IAudioProcessingService } from "../interfaces/audio-processing.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ProcessAssetUseCase {
    constructor(
        @Inject('IAssetRepository')
        private readonly assetRepository: IAssetRepository,
        @Inject('IAudioProcessingService')
        private readonly audioProcessingService: IAudioProcessingService,
        @Inject('IFileStorageService')
        private readonly fileStorageService: IFileStorageService,
    ) {}
    
    async execute(assetId: string): Promise<void> {
        console.log(`Processing asset: ${assetId}`);
        
        const asset = await this.assetRepository.findById(assetId);
        if (!asset) {
            throw new Error(`Asset not found: ${assetId}`);
        }
        
        asset.markAsProcessing();
        await this.assetRepository.save(asset);
        
        try {
            // Step 1: Create temp directory and file paths
            const tempDir = '/tmp/onetake-processing';
            await fs.mkdir(tempDir, { recursive: true });
            
            const inputFile = path.join(tempDir, `${assetId}-input${path.extname(asset.originalFileName)}`);
            const outputFile = path.join(tempDir, `${assetId}-transcoded.mp3`);
            
            console.log(`Downloading file from MinIO...`);
            
            // Step 2: Download file from MinIO to temp location
            const fileBuffer = await this.fileStorageService.getFile(asset.filePath);
            if (!fileBuffer) {
                throw new Error(`File not found in storage`);
            }
            
            await fs.writeFile(inputFile, fileBuffer);
            console.log(`Downloaded to: ${inputFile}`);
            
            // Step 3: Analyze original file
            console.log('Analyzing audio metadata...');
            const metadata = await this.audioProcessingService.analyze(inputFile);
            console.log(`Metadata extracted: `, metadata);
            
            // Step 4: Transcode to streaming
            console.log(`Transcoding to streaming format`);
            const transcodedPath = await this.audioProcessingService.transcode(inputFile, outputFile);
            
            let transcodedMinioPath: string;
            
            if (transcodedPath === inputFile) {
                // File was already optimized; use original
                transcodedMinioPath = asset.filePath;
                console.log(`Using original file (already optimizied)`);
            } else {
                // Upload transcoded file to separate bucket 
                console.log(`Uploading transcoded file to MinIO...`);
                const transcodedBuffer = await fs.readFile(transcodedPath);
                const transcodedFileName = `${path.basename(asset.originalFileName, path.extname(asset.originalFileName))}-transcoded.mp3`;
            
                transcodedMinioPath = await this.fileStorageService.save(
                    {
                        originalName: transcodedFileName,
                        buffer: transcodedBuffer,
                        mimeType: 'audio/mpeg',
                        size: transcodedBuffer.length,
                    },
                    'onetake-transcoded'
                );
                
                console.log(`Transcoded file uploaded: ${transcodedMinioPath}`);
            }

            // Step 6: Update asset with metadata and mark as ready
            asset.markAsReady(transcodedMinioPath, metadata.bpm, metadata.key);
            
                await this.assetRepository.save(asset);
                console.log(`Processing complete: ${assetId}`);
            
                await fs.unlink(inputFile).catch(() => {});
                await fs.unlink(outputFile).catch(() => {});
                console.log('Cleaned up temp files');
            } catch (error) {
                console.error(`Processing failed for ${assetId}: `, error.message);
                
                asset.markAsFailed()
                await this.assetRepository.save(asset);
            
                throw error;
            }
    }
}