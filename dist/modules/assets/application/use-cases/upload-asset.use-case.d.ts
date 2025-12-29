import { Asset } from '../../domain/entity';
import type { IAssetRepository } from '../interfaces/asset-repository.interface';
import type { IFileStorageService } from '../interfaces/file-storage.interface';
import type { IAudioProcessingInterface } from '../interfaces/audio-processing.interface';
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
    private readonly audioProcessingService;
    constructor(assetRepository: IAssetRepository, fileStorageService: IFileStorageService, audioProcessingService: IAudioProcessingInterface);
    execute(command: UploadAssetCommand): Promise<Asset>;
}
