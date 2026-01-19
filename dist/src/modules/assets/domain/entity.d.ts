export declare enum AssetStatus {
    UPLOADED = "UPLOADED",
    PROCESSING = "PROCESSING",
    READY = "READY",
    FAILED = "FAILED"
}
export declare class Asset {
    readonly id: string;
    originalFileName: string;
    mimeType: string;
    size: number;
    duration: number;
    filePath: string;
    transcodedFilePath?: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    status: AssetStatus;
    bpm?: number;
    key?: string;
    private constructor();
    static create(originalFileName: string, mimeType: string, size: number, duration: number, filePath: string, ownerId: string): Asset;
    static reconstitute(id: string, originalFileName: string, mimeType: string, size: number, duration: number, filePath: string, ownerId: string, createdAt: Date, updatedAt: Date, status: AssetStatus, transcodedFilePath?: string, bpm?: number, key?: string): Asset;
    markAsProcessing(): void;
    markAsReady(transcodedFilePath: string, bpm?: number, key?: string): void;
    markAsFailed(): void;
}
