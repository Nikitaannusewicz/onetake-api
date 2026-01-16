import * as Minio from 'minio';
export declare class MinioConfig {
    private readonly client;
    private bucketsInitialized;
    constructor();
    getClient(): Minio.Client;
    private ensureBucketsExistWithRetry;
    private ensureBucketsExist;
    private sleep;
    waitForReady(): Promise<void>;
}
