import { Injectable } from '@nestjs/common';
import { Asset } from '../../domain/entity';
import type { IAssetRepository } from '../interfaces/asset-repository.interface';
import type { IFileStorageService } from '../interfaces/file-storage.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { KyselyAssetRepository } from '../../infrastructure/repositories/kysely-asset.repository';
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

        asset.filePath = filePath;
        
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
    