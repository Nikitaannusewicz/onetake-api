import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { Asset, AssetStatus } from "../../domain/entity";
import { AssetFilterOptions, IAssetRepository } from "../../application/interfaces/asset-repository.interface";
import { Database, AssetsTable } from "../database/schema";

@Injectable()
export class KyselyAssetRepository implements IAssetRepository {
    async save(asset: Asset): Promise<Asset> {
        
    }
    
    async findById(id: string): Promise<Asset | null> {
        
    }
    
    findByOwnerId(ownerId: string): Promise<Asset[]> {
        
    }
    
    findAll(filters?: AssetFilterOptions): Promise<Asset[]> {
        
    }
    
    delete(id: string): Promise<boolean> {
        
    }
    
    exists(id: string): Promise<boolean> {
        
    }
}
