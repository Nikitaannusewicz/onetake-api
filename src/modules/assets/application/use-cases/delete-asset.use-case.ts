import { Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from "@nestjs/common";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import type { IFileStorageService } from "../interfaces/file-storage.interface";
import { NotFoundError } from "rxjs";

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
        } else if (asset) {
            try {
                await this.fileStorageService.delete(asset.filePath);

                if (asset.transcodedFilePath && asset.transcodedFilePath !== asset.filePath) {
                    await this.fileStorageService.delete(asset.transcodedFilePath);
                }

            } catch(error) {
                throw new InternalServerErrorException(`Failed to delete asset: ${error}`);
            }
            
            console.log(`Asset deleted: ${asset.id}`);
        }
    }

    
}