import { Post, Body, Controller, UseInterceptors, MaxFileSizeValidator, ParseFilePipe, UploadedFile} from "@nestjs/common";
import { FileTypeValidator } from "@nestjs/common";
import { UploadAssetUseCase } from "../../application/use-cases/upload-asset.use-case";
import { AssetDto } from "../../application/dto/asset.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadAssetDto } from "../../application/dto/asset.dto";

@Controller('assets')
export class AssetsController {
    constructor(private readonly uploadAssetUseCase: UploadAssetUseCase) {}
    
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
    
    @Post('test')
    async testUpload(@Body() body: { ownerId: string }): Promise<AssetDto> {

        const mockFile = {
            buffer: Buffer.from('fake audio data'),
            originalName: 'test-song.wav',
            mimeType: 'audio/wav',
            size: 68,
        };

        const asset = await this.uploadAssetUseCase.execute({
            ownerId: body.ownerId,
            file: mockFile,
        });

        return {
            id: asset.id,
            originalFileName: asset.originalFileName,
            mimeType: asset.mimeType,
            size: asset.size,
            duration: asset.duration,
            ownerId: asset.ownerId,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
            status: asset.status,
            bpm: asset.bpm,
            key: asset.key, 
        }
    }
}