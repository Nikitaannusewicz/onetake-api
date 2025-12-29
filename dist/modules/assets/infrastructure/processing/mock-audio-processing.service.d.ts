import { IAudioProcessingInterface, AudioAnalysisResult, TranscodeOptions } from "../../application/interfaces/audio-processing.interface";
export declare class MockAudioProcessing implements IAudioProcessingInterface {
    transcode(inputPath: string, outputPath: string, options: TranscodeOptions): Promise<void>;
    analyze(filePath: string): Promise<AudioAnalysisResult>;
    getDuration(filePath: string): Promise<number>;
    generateWaveform(inputPath: string, outputPath: string, width?: number, height?: number): Promise<string>;
    private delay;
    private getRandomKey;
}
