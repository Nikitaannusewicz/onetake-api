import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

export interface FileValidationOptions {
    maxSizeInBytes?: number;
    allowedMimeTypes?: string[];
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
    constructor(private readonly options: FileValidationOptions = {}) {
        this.options.maxSizeInBytes = options.maxSizeInBytes || 50 * 1024 * 1024;
        this.options.allowedMimeTypes = options.allowedMimeTypes || [
            'audio/mpeg',
            'audio/wav',
        ];
    }
    
    transform(file: Express.Multer.File): Express.Multer.File {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        
        if (file.size > this.options.maxSizeInBytes!) {
            const maxSizeMB = this.options.maxSizeInBytes || (1024 * 1024);
            throw new BadRequestException(`File size exceeds ${maxSizeMB}MB limit`)
        }
        
        if (!this.options.allowedMimeTypes!.includes(file.mimetype)) {
            throw new BadRequestException(`
                File type not allowed. List of accepted file types: ${this.options.allowedMimeTypes!.join(`, `)}`)
            }
            
            return file;
        }
}