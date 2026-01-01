import { IFileStorageService } from "../../application/interfaces/file-storage.interface";
import { UploadFile } from "../../application/interfaces/file-storage.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockFileStorageService implements IFileStorageService {
    private files = new Map<string, Buffer>();
    
    async save(file: UploadFile, folder?: string): Promise<string> {
        const basePath = folder || 'uploads';
        const timeStamp = Date.now();
        const filePath = `${basePath}/${timeStamp}-${file.originalName}`
    
        this.files.set(filePath, file.buffer);

        console.log(`File has been saved: ${filePath}`);
        return filePath;
    }
    
    async getFile(filePath: string): Promise<Buffer | null> {
        const file = this.files.get(filePath) || null;
        return file;
    }
    
    async delete(filePath: string): Promise<boolean> {
        const deleted = this.files.delete(filePath);
        return deleted;
    }
    
    async exists(filePath: string): Promise<boolean> {
        const exists = this.files.has(filePath);
        return exists;
    }

    getUrl(filePath: string): string {
        const url = `http://localhost:3000/stream/${filePath}`;
        return url;
    }
}
