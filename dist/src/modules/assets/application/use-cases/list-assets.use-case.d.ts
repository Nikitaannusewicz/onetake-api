import { Asset } from '../../domain/entity';
import type { IAssetRepository } from '../interfaces/asset-repository.interface';
import { ListAssetsDto } from '../dto/asset.dto';
import { PaginatedResponse } from 'src/common/pipes/types/paginated-response.type';
export declare class ListAssetsUseCase {
    private readonly assetRepository;
    constructor(assetRepository: IAssetRepository);
    execute(query: ListAssetsDto): Promise<PaginatedResponse<Asset>>;
}
