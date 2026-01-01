import { Post, Body, Controller } from "@nestjs/common";
import { UploadAssetUseCase } from "../../application/use-cases/upload-asset.use-case";
import { AssetDto } from "../../application/dto/asset.dto";

@Controller('assets')
export class AssetsController {
    constructor(private readonly uploadAssetUseCase: UploadAssetUseCase) {}
    
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