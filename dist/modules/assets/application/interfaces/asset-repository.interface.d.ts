import { Asset } from '../../domain/entity';
import { AssetStatus } from '../../domain/entity';
export interface AssetFilterOptions {
    status?: AssetStatus;
    ownerId?: string;
    minBpm?: number;
    maxBpm?: number;
    key?: string;
}
export interface IAssetRepository {
    save(asset: Asset): Promise<Asset>;
    findById(id: string): Promise<Asset | null>;
    findByOwnerId(ownerId: string): Promise<Asset[]>;
    findAll(filters?: AssetFilterOptions): Promise<Asset[]>;
    delete(id: string): Promise<boolean>;
    exists(id: string): Promise<boolean>;
}
