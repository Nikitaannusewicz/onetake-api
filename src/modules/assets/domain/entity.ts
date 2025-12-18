import { v4 as uuidv4 } from 'uuid';

export enum AssetStatus {
    UPLOADED = 'UPLOADED',
    PROCESSING = 'PROCESSING',
    READY = 'READY',
    FAILED = 'FAILED',
}

export class Asset {
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
    
    private constructor(
        id: string,
        originalFileName: string,
        mimeType: string,
        size: number,
        duration: number,
        filePath: string,
        ownerId: string,
        createdAt: Date,
        updatedAt: Date,
        status: AssetStatus,
        transcodedFilePath?: string,
        bpm?: number,
        key?: string,
    ) {
        this.id = id;
        this.originalFileName = originalFileName;
        this.mimeType = mimeType;
        this.size = size;
        this.duration = duration;
        this.filePath = filePath;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.transcodedFilePath = transcodedFilePath;
        this.bpm = bpm;
        this.key = key;
    }
    
    static create(
        originalFileName: string,
        mimeType: string,
        size: number,
        duration: number,
        filePath: string,
        ownerId: string
    ): Asset {
        const now = new Date();
        return new Asset(
            uuidv4(),
            originalFileName,
            mimeType,
            size,
            duration,
            filePath,
            ownerId,
            now,
            now,
            AssetStatus.UPLOADED,
        )
    }
    
    markAsProcessing(): void {
        if (this.status !== AssetStatus.UPLOADED) {
            throw new Error('Asset must be in UPLOADED status to start processing.');
        }
        this.status = AssetStatus.PROCESSING;
        this.updatedAt = new Date();
    }
    
    markAsReady(transcodedFilePath: string, bpm?: number, key?: string): void {
        if (this.status !== AssetStatus.PROCESSING) {
            throw new Error('Asset must be in PROCESSING status to be marked as ready.');
        }
        this.transcodedFilePath = transcodedFilePath;
        this.bpm = bpm;
        this.key = key;
        this.status = AssetStatus.READY;
        this.updatedAt = new Date()
    }
    
    markAsFailed(): void {
        if (this.status === AssetsStatus.FAILED) {
            throw new Error('Asset already of status FAILED')
        }
        this.status = AssetStatus.FAILED
        this.updatedAt = new Date()
    }
}