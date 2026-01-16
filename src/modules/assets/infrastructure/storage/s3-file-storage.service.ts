import { Injectable, Inject } from "@nestjs/common";
import { Readable } from "stream";
import { MinioConfig } from "./minio.config";
import { IFileStorageService, UploadFile } from "../../application/interfaces/file-storage.interface";

@Injectable()
export class S3FileStorageService implements IFileStorageService {
    private readonly uploadBucket: string;
    private readonly transcodedBucket: string;
    
    constructor(
        private readonly minioConfig: MinioConfig
    ) {
        this.uploadBucket = process.env.MINIO_BUCKET_UPLOADS || 'onetake-uploads';
        this.transcodedBucket = process.env.MINIO_BUCKET_TRANSCODED || 'onetake-transcoded';
    }

    async save(file: UploadFile, folder?: string): Promise<string> {
        const client = this.minioConfig.getClient();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.originalName}`;
        const bucketName = this.uploadBucket;
        
        try {
            await client.putObject(
                bucketName,
                fileName,
                file.buffer,
                file.buffer.length,
                {
                    'Content-Type': file.mimeType,
                    'X-Original-Name': file.originalName,
                }
            );

            console.log(`Uploaded file to MinIO: ${bucketName}/${fileName}`);
            return `${bucketName}/${fileName}`;
        } catch (error) {
            console.error(`MinIO upload failed:`, error);
            throw new Error(`Failed to upload file to storage: ${error.message}`);
        }
    }

    async getFile(filePath: string): Promise<Buffer> {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');

        try {
            const chunks: Buffer[] = [];
            const stream = await client.getObject(bucket, objectName);
            
            return new Promise((resolve, reject) => {
                stream.on('data', (chunk: Buffer) => chunks.push(chunk));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', () => resolve(Buffer.concat(chunks)));
            });
        } catch (error) {
            console.error(`MinIO download failed:`, error);
            throw new Error(`Failed to retrieve file from storage: ${error.message}`);
        }
    }
    
    getUrl(filePath: string): string {
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');
        const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
        const port = process.env.MINIO_PORT || '9000';
        const useSSL = process.env.MINIO_USE_SSL === 'true';
        const protocol = useSSL ? 'https' : 'http';
        
        // Pre-prod solution
        return `${protocol}://${endpoint}:${port}/${bucket}/${objectName}`;
    }
    
    async getStream(filePath: string): Promise<Readable> {
        const client = this.minioConfig.getClient()
        const [bucket, ...pathFile] = filePath.split('/');
        const objectName = pathFile.join('/');

        try {
            const stream = await client.getObject(bucket, objectName);
            console.log(`Streaming file from MinIO: ${filePath}`);
            
            return stream;
        } catch (error) {
            console.error(`MinIO stream failed:`, error);
            throw new Error(`Failed to stream file from storage: ${error.message}`);
        }
    }
    
    async delete(filePath: string): Promise<boolean> {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');
        
        try {
            await client.removeObject(bucket, objectName);
            console.log(`Deleted file from MinIO: ${filePath}`);
            
            return true;
        } catch (error) {
            console.error('MinIO delete failed:', error);
            
            return false;
        }
    }
    
    async exists(filePath: string): Promise<boolean> {
        const client = this.minioConfig.getClient();
        const [bucket, ...pathParts] = filePath.split('/');
        const objectName = pathParts.join('/');

        try {
            await client.statObject(bucket, objectName);
            return true;
        } catch (error) {
            if (error.code === "NotFound") {
                return false;
            }
            
            throw error;
        }
    }
    
}
