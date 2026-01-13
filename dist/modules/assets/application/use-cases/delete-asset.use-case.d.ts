import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
export declare class DeleteAssetUseCase {
    private readonly assetRepository;
    private readonly fileStorageService;
    constructor(assetRepository: IAssetRepository, fileStorageService: IFileStorageService);
    execute(id: string): Promise<void>;
}
