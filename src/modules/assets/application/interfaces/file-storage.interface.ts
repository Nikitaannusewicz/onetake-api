import { Readable } from "stream";

export interface UploadFile {
    originalName: string;
    buffer: Buffer;
    mimeType: string; // e.g., "audio/wav", "audio/mpeg"
    size: number;
}

export interface IFileStorageService {
    save(file: UploadFile, folder?: string): Promise<string>;
    getFile(filePath: string): Promise<Buffer | null>;
    delete(filePath: string): Promise<boolean>;
    exists(filePath: string): Promise<boolean>;
    getUrl(filePath: string): string;
    getStream(filePath: string): Promise<Readable>;
}