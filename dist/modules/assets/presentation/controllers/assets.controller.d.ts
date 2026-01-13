import { UploadAssetUseCase } from "../../application/use-cases/upload-asset.use-case";
import { AssetDto, ListAssetsDto } from "../../application/dto/asset.dto";
import { UploadAssetDto } from "../../application/dto/asset.dto";
import { ListAssetsUseCase } from "../../application/use-cases/list-assets.use-case";
import { PaginatedResponse } from "src/common/pipes/types/paginated-response.type";
import { GetAssetByIdUseCase } from "../../application/use-cases/get-asset-by-id.use-case";
import { DeleteAssetUseCase } from "../../application/use-cases/delete-asset.use-case";
export declare class AssetsController {
    private readonly uploadAssetUseCase;
    private readonly deleteAssetUseCase;
    private readonly listAssetUseCase;
    private readonly getAssetByIdUseCase;
    constructor(uploadAssetUseCase: UploadAssetUseCase, deleteAssetUseCase: DeleteAssetUseCase, listAssetUseCase: ListAssetsUseCase, getAssetByIdUseCase: GetAssetByIdUseCase);
    list(query: ListAssetsDto): Promise<PaginatedResponse<AssetDto>>;
    getAsset(id: string): Promise<AssetDto>;
    upload(file: Express.Multer.File, dto: UploadAssetDto): Promise<AssetDto>;
    deleteAsset(id: string): Promise<void>;
}
