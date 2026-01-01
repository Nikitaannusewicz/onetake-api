"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAssetRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryAssetRepository = class InMemoryAssetRepository {
    assets = new Map();
    async save(asset) {
        this.assets.set(asset.id, asset);
        console.log(`[Repository] Asset saved: ${asset.id} | Status: ${asset.status}`);
        return asset;
    }
    async findById(id) {
        const asset = this.assets.get(id) || null;
        console.log(`[Repository] Find by ID: ${id} | Found ${!!asset}`);
        return asset;
    }
    async findByOwnerId(ownerId) {
        const assetsArray = Array.from(this.assets.values()).filter(assets => assets.ownerId === ownerId);
        console.log(`[Repository] Find by owner: ${ownerId} | Found ${assetsArray.length}`);
        return assetsArray;
    }
    async findAll(filters) {
        let allAssets;
        if (filters) {
            allAssets = Array.from(this.assets.values()).filter(asset => asset.ownerId === filters.ownerId);
        }
        else {
            allAssets = Array.from(this.assets.values());
        }
        return allAssets;
    }
    async delete(id) {
        const deleteAsset = this.assets.delete(id);
        return deleteAsset;
    }
    async exists(id) {
        const exists = this.assets.has(id);
        return exists;
    }
    async findByFilters(filters) {
        let assets = Array.from(this.assets.values());
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
            assets = assets.filter(a => a.bpm !== undefined &&
                a.bpm <= filters.maxBpm &&
                a.bpm >= filters.minBpm);
        }
        return assets;
    }
};
exports.InMemoryAssetRepository = InMemoryAssetRepository;
exports.InMemoryAssetRepository = InMemoryAssetRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryAssetRepository);
//# sourceMappingURL=in-memory-asset-repository.js.map