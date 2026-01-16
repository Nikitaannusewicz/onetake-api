import { AssetUploadedEvent } from "../events/asset-uploaded.event";
import { ProcessAssetUseCase } from "../use-cases/process-asset.use-case";
export declare class AssetUploadedListener {
    private readonly processAssetUseCase;
    constructor(processAssetUseCase: ProcessAssetUseCase);
    handleAssetUploaded(uploadEvent: AssetUploadedEvent): Promise<void>;
}
