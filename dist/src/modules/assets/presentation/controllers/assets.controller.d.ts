import type { Response } from "express";
import { UploadAssetUseCase } from "../../application/use-cases/upload-asset.use-case";
import { AssetDto, ListAssetsDto } from "../../application/dto/asset.dto";
import { UploadAssetDto } from "../../application/dto/asset.dto";
import { ListAssetsUseCase } from "../../application/use-cases/list-assets.use-case";
import { PaginatedResponse } from "src/common/pipes/types/paginated-response.type";
import { GetAssetByIdUseCase } from "../../application/use-cases/get-asset-by-id.use-case";
import { DeleteAssetUseCase } from "../../application/use-cases/delete-asset.use-case";
import { StreamAssetUseCase } from "../../application/use-cases/stream-asset.use-case";
export declare class AssetsController {
    private readonly uploadAssetUseCase;
    private readonly deleteAssetUseCase;
    private readonly listAssetUseCase;
    private readonly getAssetByIdUseCase;
    private readonly streamAssetUseCase;
    constructor(uploadAssetUseCase: UploadAssetUseCase, deleteAssetUseCase: DeleteAssetUseCase, listAssetUseCase: ListAssetsUseCase, getAssetByIdUseCase: GetAssetByIdUseCase, streamAssetUseCase: StreamAssetUseCase);
    list(query: ListAssetsDto): Promise<PaginatedResponse<AssetDto>>;
    streamAsset(id: string, response: Response): Promise<void>;
    getAsset(id: string): Promise<AssetDto>;
    upload(file: Express.Multer.File, dto: UploadAssetDto): Promise<AssetDto>;
    deleteAsset(id: string): Promise<void>;
}
