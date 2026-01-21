import { Injectable } from "@nestjs/common";
import { max } from "class-validator";
import * as Minio from 'minio';

@Injectable()
export class MinioConfig {
    private readonly client: Minio.Client;
    private bucketsInitialized = false;
    
    constructor() {
        this.client = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
        port: parseInt(process.env.MINIO_PORT || '9000'),
        useSSL: process.env.MINIO_USE_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS_KEY || 'onetake',
        secretKey: process.env.MINIO_SECRET_KEY || 'onetake123',
        });
        
        this.ensureBucketsExistWithRetry();
    }
    
    getClient(): Minio.Client {
        return this.client;
    }
    
    private async ensureBucketsExistWithRetry(maxRetries = 5, delayMs = 200): Promise<void> {
        let attempt = 1
        while (attempt <= maxRetries && this.bucketsInitialized === false) {
            try {
                console.log(`[MinIO] Connection attempt ${attempt}/${maxRetries}...`);
                await this.ensureBucketsExist();
                this.bucketsInitialized = true;
                console.log(`[MinIO] connection successful`);
            } catch (error) {
                if (attempt >= maxRetries) {
                    console.log(`failed to connect to MinIO after ${maxRetries} attempts:`, error.message);
                    console.error(`Application will continue, but file uploads may fail until MinIO is available`);
                    
                    return;
                }
            }
        }
    }
    
    private async ensureBucketsExist(): Promise<void> {
        const buckets = [
            process.env.MINIO_BUCKET_UPLOADS || 'onetake-uploads',
            process.env.MINIO_BUCKET_TRANSCODED || 'onetake-transcoded',
        ];

        for (const bucket of buckets) {
            try {
                const exists = await this.client.bucketExists(bucket);
                if (!exists) {
                    await this.client.makeBucket(bucket, 'us-east-1');
                    console.log(`Createn MinIO bucket: ${bucket}`);
                }
            } catch (error) {
                console.error(`Failed to create bucket ${bucket}:`, error);
            }
            
        }
    }
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
        
    }
        async waitForReady(): Promise<void> {
            while (!this.bucketsInitialized) {
                await this.sleep(100);
            }
    }
}