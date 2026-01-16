import { Kysely } from "kysely";
import { Asset } from "../../domain/entity";
import { AssetFilterOptions, IAssetRepository } from "../../application/interfaces/asset-repository.interface";
import { Database } from "../database/schema";
export declare class KyselyAssetRepository implements IAssetRepository {
    private readonly db;
    constructor(db: Kysely<Database>);
    save(asset: Asset): Promise<Asset>;
    findById(id: string): Promise<Asset | null>;
    findByOwnerId(ownerId: string): Promise<Asset[]>;
    findAll(filters?: AssetFilterOptions): Promise<Asset[]>;
    delete(id: string): Promise<boolean>;
    exists(id: string): Promise<boolean>;
}
