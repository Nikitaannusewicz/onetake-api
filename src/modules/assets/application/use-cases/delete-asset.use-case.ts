import { Inject, Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
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
            throw new NotFoundException(`Asset not found`);
        }
        
        try {
            await this.fileStorageService.delete(asset.filePath);
            
            if (asset.transcodedFilePath && asset.transcodedFilePath !== asset.filePath) {
                await this.fileStorageService.delete(asset.transcodedFilePath);
            }
            
            console.log('File deleted from storage');
        } catch (error) {
            console.warn(`Failed to delete file(s) from storage: ${error.message}`)
        }
        
        const deleted = await this.assetRepository.delete(asset.id);
        
        if (!deleted) {
            throw new NotFoundException('Asset not found in database');
        }
        
        console.log(`Asset successfuly deleted from database: ${asset.id}`);
    }
}

    