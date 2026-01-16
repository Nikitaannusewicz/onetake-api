"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3FileStorageService = void 0;
const common_1 = require("@nestjs/common");
const minio_config_1 = require("./minio.config");
let S3FileStorageService = class S3FileStorageService {
    minioConfig;
    uploadBucket;
    transcodedBucket;
    constructor(minioConfig) {
        this.minioConfig = minioConfig;
        this.uploadBucket = process.env.MINIO_BUCKET_UPLOADS || 'onetake-uploads';
        this.transcodedBucket = process.env.MINIO_BUCKET_TRANSCODED || 'onetake-transcoded';
    }
    async save(file, folder) {
        const client = this.minioConfig.getClient();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.originalName}`;
        const bucketName = this.uploadBucket;
        try {
            await client.putObject(bucketName, fileName, file.buffer, file.buffer.length, {
                'Content-Type': file.mimeType,
                'X-Original-Name': file.originalName,
            });
            console.log(`Uploaded file to MinIO: ${bucketName}/${fileName}`);
            return `${bucketName}/${fileName}`;
        }
        catch (error) {
            console.error(`MinIO upload failed:`, error);
            throw new Error(`Failed to upload file to storage: ${error.message}`);
        }
    }
    async getFile(filePath) {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');
        try {
            const chunks = [];
            const stream = await client.getObject(bucket, objectName);
            return new Promise((resolve, reject) => {
                stream.on('data', (chunk) => chunks.push(chunk));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', () => resolve(Buffer.concat(chunks)));
            });
        }
        catch (error) {
            console.error(`MinIO download failed:`, error);
            throw new Error(`Failed to retrieve file from storage: ${error.message}`);
        }
    }
    getUrl(filePath) {
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');
        const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
        const port = process.env.MINIO_PORT || '9000';
        const useSSL = process.env.MINIO_USE_SSL === 'true';
        const protocol = useSSL ? 'https' : 'http';
        return `${protocol}://${endpoint}:${port}/${bucket}/${objectName}`;
    }
    async getStream(filePath) {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathFile] = filePath.split('/');
        const objectName = pathFile.join('/');
        try {
            const stream = await client.getObject(bucket, objectName);
            console.log(`Streaming file from MinIO: ${filePath}`);
            return stream;
        }
        catch (error) {
            console.error(`MinIO stream failed:`, error);
            throw new Error(`Failed to stream file from storage: ${error.message}`);
        }
    }
    async delete(filePath) {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');
        try {
            await client.removeObject(bucket, objectName);
            console.log(`Deleted file from MinIO: ${filePath}`);
            return true;
        }
        catch (error) {
            console.error('MinIO delete failed:', error);
            return false;
        }
    }
    async exists(filePath) {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');
        try {
            await client.statObject(bucket, objectName);
            return true;
        }
        catch (error) {
            if (error.code === "NotFound") {
                return false;
            }
            throw error;
        }
    }
};
exports.S3FileStorageService = S3FileStorageService;
exports.S3FileStorageService = S3FileStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [minio_config_1.MinioConfig])
], S3FileStorageService);
//# sourceMappingURL=s3-file-storage.service.js.map