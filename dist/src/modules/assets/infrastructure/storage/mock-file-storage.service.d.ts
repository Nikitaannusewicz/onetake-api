import { IFileStorageService } from "../../application/interfaces/file-storage.interface";
import { UploadFile } from "../../application/interfaces/file-storage.interface";
export declare class MockFileStorageService implements IFileStorageService {
    private files;
    save(file: UploadFile, folder?: string): Promise<string>;
    getFile(filePath: string): Promise<Buffer | null>;
    delete(filePath: string): Promise<boolean>;
    exists(filePath: string): Promise<boolean>;
    getUrl(filePath: string): string;
}
