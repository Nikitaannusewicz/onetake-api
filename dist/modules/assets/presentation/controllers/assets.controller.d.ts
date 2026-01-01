import { UploadAssetUseCase } from "../../application/use-cases/upload-asset.use-case";
import { AssetDto } from "../../application/dto/asset.dto";
export declare class AssetsController {
    private readonly uploadAssetUseCase;
    constructor(uploadAssetUseCase: UploadAssetUseCase);
    testUpload(body: {
        ownerId: string;
    }): Promise<AssetDto>;
}
