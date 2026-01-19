import { Asset } from '../../domain/entity';
import type { IAssetRepository } from '../interfaces/asset-repository.interface';
import type { IFileStorageService } from '../interfaces/file-storage.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
export interface UploadAssetCommand {
    ownerId: string;
    file: {
        buffer: Buffer;
        originalName: string;
        mimeType: string;
        size: number;
    };
}
export declare class UploadAssetUseCase {
    private readonly assetRepository;
    private readonly fileStorageService;
    private readonly eventEmitter;
    constructor(assetRepository: IAssetRepository, fileStorageService: IFileStorageService, eventEmitter: EventEmitter2);
    execute(command: UploadAssetCommand): Promise<Asset>;
}
