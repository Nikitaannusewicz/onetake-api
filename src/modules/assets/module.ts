import { Module } from "@nestjs/common"
import { UploadAssetUseCase } from "./application/use-cases/upload-asset.use-case";
import { ProcessAssetUseCase } from "./application/use-cases/process-asset.use-case";
import { AssetUploadedListener } from "./application/listeners/asset-uploaded.listener";
import { InMemoryAssetRepository } from "./infrastructure/repositories/in-memory-asset-repository";
import { MockAudioProcessing } from "./infrastructure/processing/mock-audio-processing.service";
import { MockFileStorageService } from "./infrastructure/storage/mock-file-storage.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        UploadAssetUseCase,
        ProcessAssetUseCase,
        AssetUploadedListener,
        {
            provide: 'IAssetRepository',
            useClass: InMemoryAssetRepository,
        },
        {
            provide: 'IAudioProcessingInterface',
            useClass: MockAudioProcessing,
        },
        {
            provide: 'IFileStorageService',
            useClass: MockFileStorageService,
        },
    ],
})
export class AssetsModule {}