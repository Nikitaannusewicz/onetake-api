import { Readable } from "stream";
import { MinioConfig } from "./minio.config";
import { IFileStorageService, UploadFile } from "../../application/interfaces/file-storage.interface";
export declare class S3FileStorageService implements IFileStorageService {
    private readonly minioConfig;
    private readonly uploadBucket;
    private readonly transcodedBucket;
    constructor(minioConfig: MinioConfig);
    save(file: UploadFile, folder?: string): Promise<string>;
    getFile(filePath: string): Promise<Buffer>;
    getUrl(filePath: string): string;
    getStream(filePath: string): Promise<Readable>;
    delete(filePath: string): Promise<boolean>;
    exists(filePath: string): Promise<boolean>;
}
