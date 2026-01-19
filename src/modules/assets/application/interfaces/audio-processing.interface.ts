export interface AudioMetaData {
    duration: number;
    bitrate?: number;
    sampleRate?: number;
    channels?: number;
    format?: string;
    codec?: string;
    bpm?: number;
    key?: string;
}

export interface IAudioProcessingService {
    transcode(inputPath: string, outputPath: string): Promise<string>;
    analyze(filePath: string): Promise<AudioMetaData>;
    isStreamReady(filePath: string): Promise<boolean>;
}