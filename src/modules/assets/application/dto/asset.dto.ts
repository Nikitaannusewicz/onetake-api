import { Asset, AssetStatus } from '../../domain/entity';
import { IFileStorageService } from '../interfaces/file-storage.interface';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class AssetDto {
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
    streamUrl?: string
    
    static fromEntity(asset: Asset, streamURL?: string): AssetDto {
        const dto = new AssetDto();
        dto.id = asset.id;
        dto.originalFileName = asset.originalFileName;
        dto.mimeType = asset.mimeType;
        dto.size = asset.size;
        dto.duration = asset.duration;
        dto.status = asset.status;
        dto.bpm = asset.bpm;
        dto.key = asset.key;
        dto.createdAt = asset.createdAt;
        dto.updatedAt = asset.updatedAt;
        dto.ownerId = asset.ownerId;
        dto.streamUrl = streamURL;
        return dto;
    }

    static fromEntityWithUrl(
        asset: Asset,
        fileStorageService: IFileStorageService,
    ): AssetDto {
        let streamUrl: string | undefined;
        if (asset.status == AssetStatus.READY && asset.transcodedFilePath) {
            streamUrl = fileStorageService.getUrl(asset.transcodedFilePath);
        }
        return AssetDto.fromEntity(asset, streamUrl);
    }
}

export class UploadAssetDto {
    @IsString()
    @IsNotEmpty()
    ownerId: string
}

export class ListAssetsDto {
    @IsOptional()
    @IsEnum(AssetStatus)
    status?: AssetStatus;
    
    @IsOptional()
    @IsString()
    ownerId?: string;
    
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minBpm?: number

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxBpm?: number;
    
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number = 20;
}


