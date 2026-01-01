import { Injectable } from "@nestjs/common";
import { Asset } from "../../domain/entity";
import { AssetFilterOptions, IAssetRepository } from "../../application/interfaces/asset-repository.interface";
import { AssetStatus } from "../../domain/entity";

@Injectable()
export class InMemoryAssetRepository implements IAssetRepository {
    private assets = new Map<string, Asset>();
    
    async save(asset: Asset): Promise<Asset> {
        this.assets.set(asset.id, asset);
        console.log(`[Repository] Asset saved: ${asset.id} | Status: ${asset.status}`);
        
        return asset;
    }
    
    async findById(id: string): Promise<Asset | null> {
        const asset = this.assets.get(id) || null;
        console.log(`[Repository] Find by ID: ${id} | Found ${!!asset}`);
        return asset;
    }
    
    async findByOwnerId(ownerId: string): Promise<Asset[]> {
        const assetsArray = Array.from(this.assets.values()).filter(
            assets => assets.ownerId === ownerId
        );
        console.log(`[Repository] Find by owner: ${ownerId} | Found ${assetsArray.length}`);
        
        return assetsArray;
    }
    
    async findAll(filters?: AssetFilterOptions): Promise<Asset[]> {
        let allAssets: Asset[];
        if (filters) {
            allAssets = Array.from(this.assets.values()).filter(
                asset => asset.ownerId === filters.ownerId
            );
        } else {
            allAssets = Array.from(this.assets.values());
        }
        
        return allAssets;
    }
    
    async delete(id: string): Promise<boolean> {
        const deleteAsset = this.assets.delete(id);
        return deleteAsset;
    }
    
    async exists(id: string): Promise<boolean> {
         const exists = this.assets.has(id);
         return exists;
    }
    
    async findByFilters(filters: {
        status?: AssetStatus;
        ownerId?: string;
        minBpm?: number;
        maxBpm?: number;
        key?: string;
    }): Promise<Asset[]> {
        let assets = Array.from(this.assets.values())
        
        if (filters.status) {
            assets = assets.filter(a => a.status === filters.status);
        }
        
        if (filters.ownerId) {
            assets = assets.filter(a => a.ownerId === filters.ownerId);
        }
        
        if (filters.key) {
            assets = assets.filter(a => a.key === filters.key);
        }
        
        if (filters.minBpm !== undefined && filters.maxBpm !== undefined) {
            assets = assets.filter(a => 
               a.bpm !== undefined &&
               a.bpm <= filters.maxBpm! &&
               a.bpm >= filters.minBpm! 
            );
        }
        
        return assets;
    }


}