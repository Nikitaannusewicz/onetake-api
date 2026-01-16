export interface AudioAnalysisResult {
    duration: number;
    bpm?: number;
    key?: string;
    sampleRate?: number;
    bitrate?: number;
}
export interface TranscodeOptions {
    targetFormat: string;
    bitrate: number;
    sampleRate?: number;
}
export interface IAudioProcessingInterface {
    transcode(inputPath: string, outputPath: string, options: TranscodeOptions): Promise<void>;
    analyze(filePath: string): Promise<AudioAnalysisResult>;
    getDuration(filePath: string): Promise<number>;
    generateWaveform(inputPath: string, outputPath: string, width?: number, height?: number): Promise<string>;
}
