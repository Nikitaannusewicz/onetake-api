"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const upload_asset_use_case_1 = require("./application/use-cases/upload-asset.use-case");
const process_asset_use_case_1 = require("./application/use-cases/process-asset.use-case");
const asset_uploaded_listener_1 = require("./application/listeners/asset-uploaded.listener");
const assets_controller_1 = require("./presentation/controllers/assets.controller");
const list_assets_use_case_1 = require("./application/use-cases/list-assets.use-case");
const get_asset_by_id_use_case_1 = require("./application/use-cases/get-asset-by-id.use-case");
const delete_asset_use_case_1 = require("./application/use-cases/delete-asset.use-case");
const database_1 = require("./infrastructure/database/database");
const kysely_asset_repository_1 = require("./infrastructure/repositories/kysely-asset.repository");
const minio_config_1 = require("./infrastructure/storage/minio.config");
const s3_file_storage_service_1 = require("./infrastructure/storage/s3-file-storage.service");
const stream_asset_use_case_1 = require("./application/use-cases/stream-asset.use-case");
const ffmpeg_audio_processor_service_1 = require("./infrastructure/processing/ffmpeg-audio-processor.service");
let AssetsModule = class AssetsModule {
};
exports.AssetsModule = AssetsModule;
exports.AssetsModule = AssetsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [event_emitter_1.EventEmitterModule.forRoot()],
        controllers: [assets_controller_1.AssetsController],
        providers: [
            list_assets_use_case_1.ListAssetsUseCase,
            delete_asset_use_case_1.DeleteAssetUseCase,
            get_asset_by_id_use_case_1.GetAssetByIdUseCase,
            upload_asset_use_case_1.UploadAssetUseCase,
            process_asset_use_case_1.ProcessAssetUseCase,
            stream_asset_use_case_1.StreamAssetUseCase,
            asset_uploaded_listener_1.AssetUploadedListener,
            {
                provide: 'DATABASE',
                useFactory: () => (0, database_1.createDatabase)(),
            },
            {
                provide: 'IAssetRepository',
                useClass: kysely_asset_repository_1.KyselyAssetRepository,
            },
            minio_config_1.MinioConfig,
            {
                provide: 'IFileStorageService',
                useClass: s3_file_storage_service_1.S3FileStorageService,
            },
            {
                provide: 'IAudioProcessingService',
                useClass: ffmpeg_audio_processor_service_1.FfmpegAudioProcessingService,
            },
        ],
        exports: ['DATABASE'],
    })
], AssetsModule);
//# sourceMappingURL=module.js.map