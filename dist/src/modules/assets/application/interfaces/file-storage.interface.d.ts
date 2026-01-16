export interface UploadFile {
    originalName: string;
    buffer: Buffer;
    mimeType: string;
    size: number;
}
export interface IFileStorageService {
    save(file: UploadFile, folder?: string): Promise<string>;
    getFile(filePath: string): Promise<Buffer | null>;
    delete(filePath: string): Promise<boolean>;
    exists(filePath: string): Promise<boolean>;
    getUrl(filePath: string): string;
}
