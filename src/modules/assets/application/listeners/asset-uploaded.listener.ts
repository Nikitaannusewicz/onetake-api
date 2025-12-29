import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AssetUploadedEvent } from "../events/asset-uploaded.event";
import { ProcessAssetUseCase } from "../use-cases/process-asset.use-case";

@Injectable()
export class AssetUploadedListener {
    constructor(
        private readonly processAssetUseCase: ProcessAssetUseCase
    ) {}
    
    @OnEvent('asset.uploaded', { async: true})
    async handleAssetUploaded(uploadEvent: AssetUploadedEvent): Promise<void> {
        try {
            await this.processAssetUseCase.execute(uploadEvent.assetId);
        } catch (error) {
            console.error(`Listener failed`, error);
        }
    }
}