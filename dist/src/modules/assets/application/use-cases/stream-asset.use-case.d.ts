import { Readable } from "stream";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
export declare class StreamAssetUseCase {
    private readonly assetRepository;
    private readonly fileStorageService;
    constructor(assetRepository: IAssetRepository, fileStorageService: IFileStorageService);
    execute(assetId: string): Promise<{
        stream: Readable;
        mimeType: string;
        size: number;
        fileName: string;
    }>;
}
