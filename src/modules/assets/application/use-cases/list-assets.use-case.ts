import { Inject, Injectable } from '@nestjs/common';
import { Asset } from '../../domain/entity';
import type { IAssetRepository } from '../interfaces/asset-repository.interface';
import { ListAssetsDto } from '../dto/asset.dto';
import { PaginatedResponse, createPaginatedResponse } from 'src/common/pipes/types/paginated-response.type';

@Injectable()
export class ListAssetsUseCase {
    constructor(
        @Inject('IAssetRepository')
        private readonly assetRepository: IAssetRepository,
    ) {}
    
    async execute(query: ListAssetsDto): Promise<PaginatedResponse<Asset>> {
        const filters = {
            status: query.status,
            ownerId: query.ownerId,
            minBpm: query.minBpm,
            maxBpm: query.maxBpm,
        };

        const allFilteredAssets = await this.assetRepository.findAll(filters);
        
        const skip = ((query.page || 1) - 1) * (query.limit || 10);
        const take = query.limit || 10;
        
        const paginatedAssets = allFilteredAssets.slice(skip, skip + take);
        
        return createPaginatedResponse(
            paginatedAssets,
            allFilteredAssets.length,
            query.page || 1,
            take,
        );
    }
}