import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IAudioProcessingInterface } from "../interfaces/audio-processing.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
export declare class ProcessAssetUseCase {
    private readonly assetRepository;
    private readonly audioProcessingService;
    private readonly storageService;
    constructor(assetRepository: IAssetRepository, audioProcessingService: IAudioProcessingInterface, storageService: IFileStorageService);
    execute(assetId: string): Promise<void>;
}
