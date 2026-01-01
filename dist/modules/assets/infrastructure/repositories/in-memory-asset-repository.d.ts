import { Asset } from "../../domain/entity";
import { AssetFilterOptions, IAssetRepository } from "../../application/interfaces/asset-repository.interface";
import { AssetStatus } from "../../domain/entity";
export declare class InMemoryAssetRepository implements IAssetRepository {
    private assets;
    save(asset: Asset): Promise<Asset>;
    findById(id: string): Promise<Asset | null>;
    findByOwnerId(ownerId: string): Promise<Asset[]>;
    findAll(filters?: AssetFilterOptions): Promise<Asset[]>;
    delete(id: string): Promise<boolean>;
    exists(id: string): Promise<boolean>;
    findByFilters(filters: {
        status?: AssetStatus;
        ownerId?: string;
        minBpm?: number;
        maxBpm?: number;
        key?: string;
    }): Promise<Asset[]>;
}
