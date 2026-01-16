import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { Asset } from "../../domain/entity";
import type { IAssetRepository } from "../interfaces/asset-repository.interface";
import { KyselyAssetRepository } from "../../infrastructure/repositories/kysely-asset.repository";

@Injectable()
export class GetAssetByIdUseCase {
    constructor(
        @Inject('IAssetRepository')
        private readonly assetRepository: IAssetRepository,
    ) {}
    
    async execute(id: string): Promise<Asset> {
        const asset = await this.assetRepository.findById(id);
        
        if (!asset) {
            throw new NotFoundException(`Asset not found`);
        }
        
        return asset;
    }
}