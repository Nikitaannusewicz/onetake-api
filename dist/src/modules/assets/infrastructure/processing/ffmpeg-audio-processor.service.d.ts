import { AudioMetaData, IAudioProcessingService } from "../../application/interfaces/audio-processing.interface";
export declare class FfmpegAudioProcessingService implements IAudioProcessingService {
    transcode(inputPath: string, outputPath: string): Promise<string>;
    analyze(filePath: string): Promise<AudioMetaData>;
    isStreamReady(filePath: string): Promise<boolean>;
}
