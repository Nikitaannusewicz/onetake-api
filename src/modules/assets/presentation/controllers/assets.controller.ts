import { Post, Query, Body, Param, Delete, Controller, UseInterceptors, MaxFileSizeValidator, ParseFilePipe, UploadedFile, Get, HttpCode} from "@nestjs/common";
import { FileTypeValidator } from "@nestjs/common";
import { UploadAssetUseCase } from "../../application/use-cases/upload-asset.use-case";
import { AssetDto, ListAssetsDto } from "../../application/dto/asset.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadAssetDto } from "../../application/dto/asset.dto";
import { ListAssetsUseCase } from "../../application/use-cases/list-assets.use-case";
import { PaginatedResponse } from "src/common/pipes/types/paginated-response.type";
import { GetAssetByIdUseCase } from "../../application/use-cases/get-asset-by-id.use-case";
import { DeleteAssetUseCase } from "../../application/use-cases/delete-asset.use-case";
import { HttpStatus } from "@nestjs/common";

@Controller('assets')
export class AssetsController {
    constructor(
        private readonly uploadAssetUseCase: UploadAssetUseCase,
        private readonly deleteAssetUseCase: DeleteAssetUseCase,
        private readonly listAssetUseCase: ListAssetsUseCase,
        private readonly getAssetByIdUseCase: GetAssetByIdUseCase,
    ) {}
    
    @Get()
    async list(
        @Query() query: ListAssetsDto,
    ): Promise<PaginatedResponse<AssetDto>> {
        const result = await this.listAssetUseCase.execute(query);
        const dtoData = result.data.map(asset => AssetDto.fromEntity(asset));
        
        return {
            data: dtoData,
            meta: result.meta,
        };        
    }
    
    @Get(':id')
    async getAsset(@Param('id') id: string): Promise<AssetDto> {
        const result = await this.getAssetByIdUseCase.execute(id);
        const assetDto = AssetDto.fromEntity(result);

        return assetDto;        
    }
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024}),
                    new FileTypeValidator({ fileType: /audio\/(mpeg|wav)/ }),
                ]
            }),
        )
        file: Express.Multer.File,
        @Body() dto: UploadAssetDto,
    ): Promise<AssetDto> {
        const asset = await this.uploadAssetUseCase.execute({
            ownerId: dto.ownerId,
            file: {
                buffer: file.buffer,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
            },
        });
        
        return {
            id: asset.id,
            originalFileName: asset.originalFileName,
            mimeType: asset.mimeType,
            size: asset.size,
            duration: asset.duration,
            status: asset.status,
            bpm: asset.bpm,
            key: asset.key,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
            ownerId: asset.ownerId,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAsset(@Param('id') id: string): Promise<void> {
        this.deleteAssetUseCase.execute(id);
    }
}   