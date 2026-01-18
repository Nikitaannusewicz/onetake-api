import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Readable } from "stream";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";

@Injectable()
export class StreamAssetUseCase {
    constructor(
        @Inject('IAssetRepository')
        private readonly assetRepository: IAssetRepository,
        @Inject('IFileStorageService')
        private readonly fileStorageService: IFileStorageService,
    ) {}
    
    async execute(assetId: string): Promise<{
        stream: Readable;
        mimeType: string;
        size: number;
        fileName: string;
    }> {
        const asset = await this.assetRepository.findById(assetId);
        
        if (!asset) {
            throw new NotFoundException(`Asset with id: ${assetId} not found`);
        }
        
        const filePath = asset.transcodedFilePath || asset.filePath;
        const mimeType = asset.transcodedFilePath ? 'audio/mpeg' : asset.mimeType;
        const stream = await this.fileStorageService.getStream(filePath);
        
        return {
            stream,
            mimeType,
            size: asset.size,
            fileName: asset.originalFileName,
        }
    }
}