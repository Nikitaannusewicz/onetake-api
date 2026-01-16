import { Global, Module } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UploadAssetUseCase } from "./application/use-cases/upload-asset.use-case";
import { ProcessAssetUseCase } from "./application/use-cases/process-asset.use-case";
import { AssetUploadedListener } from "./application/listeners/asset-uploaded.listener";
import { InMemoryAssetRepository } from "./infrastructure/repositories/in-memory-asset-repository";
import { MockAudioProcessingService } from "./infrastructure/processing/mock-audio-processing.service";
import { MockFileStorageService } from "./infrastructure/storage/mock-file-storage.service";
import { AssetsController } from "./presentation/controllers/assets.controller";
import { ListAssetsUseCase } from "./application/use-cases/list-assets.use-case";
import { GetAssetByIdUseCase } from "./application/use-cases/get-asset-by-id.use-case";
import { DeleteAssetUseCase } from "./application/use-cases/delete-asset.use-case";
import { createDatabase } from "./infrastructure/database/database";
import { KyselyAssetRepository } from "./infrastructure/repositories/kysely-asset.repository";

@Global()
@Module({
    imports: [EventEmitterModule.forRoot()],
    controllers: [AssetsController],
    providers: [
        ListAssetsUseCase,
        DeleteAssetUseCase,
        GetAssetByIdUseCase,
        UploadAssetUseCase,
        ProcessAssetUseCase,
        AssetUploadedListener,
        {
            provide: 'DATABASE',
            useFactory: () => createDatabase(),
        },
        {
            provide: 'IAssetRepository',
            useClass: KyselyAssetRepository,
        },
        {
            provide: 'IAudioProcessingInterface',
            useClass: MockAudioProcessingService,
        },
        {
            provide: 'IFileStorageService',
            useClass: MockFileStorageService,
        },
    ],
  exports: ['DATABASE'],
})
export class AssetsModule {}