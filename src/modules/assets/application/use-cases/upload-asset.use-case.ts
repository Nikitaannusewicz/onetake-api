import { Injectable } from '@nestjs/common';
import { Asset } from '../../domain/entity';
import type { IAssetRepository } from '../interfaces/asset-repository.interface';
import type { IFileStorageService } from '../interfaces/file-storage.interface';
import type { IAudioProcessingInterface } from '../interfaces/audio-processing.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AssetUploadedEvent } from '../events/asset-uploaded.event';
import { Inject } from '@nestjs/common';

export interface UploadAssetCommand {
    ownerId: string;
    file: {
        buffer: Buffer;
        originalName: string;
        mimeType: string;
        size: number;
    };
}

@Injectable()
export class UploadAssetUseCase {
    constructor(
        @Inject('IAssetRepository')
        private readonly assetRepository: IAssetRepository,
        @Inject('IFileStorageService')
        private readonly fileStorageService: IFileStorageService,
        @Inject('IAudioProcessingInterface')
        private readonly audioProcessingService: IAudioProcessingInterface,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async execute(command: UploadAssetCommand): Promise<Asset> {
        
        const asset = Asset.create(
            command.file.originalName, 
            command.file.mimeType, 
            command.file.size,
            0,
            "",
            command.ownerId,
        )
        
        let filePath: string;
        try {
            filePath = await this.fileStorageService.save(command.file);
        } catch (error) {
            asset.markAsFailed();
            throw new Error(`Internal server error: ${error.message}`);
        }
        
        let fileDuration: number;
        try {
            fileDuration = await this.audioProcessingService.getDuration(filePath);
        } catch (error) {
            await this.fileStorageService.delete(filePath);
            asset.markAsFailed();
            throw new Error(`Failed to analyze audio: ${error.message}`);
        }

        asset.filePath = filePath;
        asset.duration = fileDuration;
        
        asset.markAsProcessing()
        await this.assetRepository.save(asset);

        this.eventEmitter.emit(
            'asset.uploaded',
            new AssetUploadedEvent(
                asset.id,
                asset.filePath,
                asset.ownerId,
            )
        );
        
        return asset;
    }
}
    