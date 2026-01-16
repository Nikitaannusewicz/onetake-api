import { Asset, AssetStatus } from '../../domain/entity';
import { IFileStorageService } from '../interfaces/file-storage.interface';
export declare class AssetDto {
    id: string;
    originalFileName: string;
    mimeType: string;
    size: number;
    duration: number;
    status: AssetStatus;
    bpm?: number;
    key?: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    streamUrl?: string;
    static fromEntity(asset: Asset, streamURL?: string): AssetDto;
    static fromEntityWithUrl(asset: Asset, fileStorageService: IFileStorageService): AssetDto;
}
export declare class UploadAssetDto {
    ownerId: string;
}
export declare class ListAssetsDto {
    status?: AssetStatus;
    ownerId?: string;
    minBpm?: number;
    maxBpm?: number;
    page?: number;
    limit?: number;
}
