import { Global, Module } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UploadAssetUseCase } from "./application/use-cases/upload-asset.use-case";
import { ProcessAssetUseCase } from "./application/use-cases/process-asset.use-case";
import { AssetUploadedListener } from "./application/listeners/asset-uploaded.listener";
import { AssetsController } from "./presentation/controllers/assets.controller";
import { ListAssetsUseCase } from "./application/use-cases/list-assets.use-case";
import { GetAssetByIdUseCase } from "./application/use-cases/get-asset-by-id.use-case";
import { DeleteAssetUseCase } from "./application/use-cases/delete-asset.use-case";
import { createDatabase } from "./infrastructure/database/database";
import { KyselyAssetRepository } from "./infrastructure/repositories/kysely-asset.repository";
import { MinioConfig } from "./infrastructure/storage/minio.config";
import { S3FileStorageService } from "./infrastructure/storage/s3-file-storage.service";
import { StreamAssetUseCase } from "./application/use-cases/stream-asset.use-case";
import { FfmpegAudioProcessingService } from "./infrastructure/processing/ffmpeg-audio-processor.service";

@Global()
@Module({
    imports: [EventEmitterModule.forRoot()],
    controllers: [AssetsController],
    providers: [
        // Use Cases
        ListAssetsUseCase,
        DeleteAssetUseCase,
        GetAssetByIdUseCase,
        UploadAssetUseCase,
        ProcessAssetUseCase,
        StreamAssetUseCase,

        // Listeners
        AssetUploadedListener,
        
        // Database
        {
            provide: 'DATABASE',
            useFactory: () => createDatabase(),
        },
        
        // Repository
        {
            provide: 'IAssetRepository',
            useClass: KyselyAssetRepository,
        },
        
        // File Storage
        MinioConfig,
        {
            provide: 'IFileStorageService',
            useClass: S3FileStorageService,
        },
        
        // Audio Processing (mock)
        {
            provide: 'IAudioProcessingService',
            useClass: FfmpegAudioProcessingService,
        },
    ],
  exports: ['DATABASE'],
})
export class AssetsModule {}