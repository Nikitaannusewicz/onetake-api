import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IAudioProcessingService } from "../interfaces/audio-processing.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
export declare class ProcessAssetUseCase {
    private readonly assetRepository;
    private readonly audioProcessingService;
    private readonly fileStorageService;
    constructor(assetRepository: IAssetRepository, audioProcessingService: IAudioProcessingService, fileStorageService: IFileStorageService);
    execute(assetId: string): Promise<void>;
}
