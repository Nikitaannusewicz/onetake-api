import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";

@Injectable()
export class DeleteAssetUseCase {
    constructor(
        @Inject('IAssetRepository')
        private readonly assetRepository: IAssetRepository,
        @Inject('IFileStorageService')
        private readonly fileStorageService: IFileStorageService,
    ) {}
    
    async execute(id: string): Promise<void> {
        const asset = await this.assetRepository.findById(id);
        
        if (!asset) {
            throw new NotFoundException('Asset not found');
            return
        }
        
        await this.fileStorageService.delete(asset.filePath);
        console.log(`Asset deleted: ${asset.id}`);

    }
}

    