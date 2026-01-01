import { Injectable, Options } from "@nestjs/common";
import { IAudioProcessingInterface, AudioAnalysisResult, TranscodeOptions } from "../../application/interfaces/audio-processing.interface";

@Injectable()
export class MockAudioProcessing implements IAudioProcessingInterface {

    async transcode(
        inputPath: string,
        outputPath: string,
        options: TranscodeOptions,
    ): Promise<void> {
        console.log(
            `[Audio] Transcoding ${inputPath} -> ${outputPath}`
        );
        console.log(
            `Format: ${options.targetFormat} | Bitrate: ${options.bitrate}`
        );
        
        console.log(`[Audio] Transcode complete`);
    }
    
    async analyze(filePath: string): Promise<AudioAnalysisResult> {
        console.log(`Analyzing file: ${filePath}`);
       
        return {
            duration: 160,
            bpm: 120,
            key: this.getRandomKey(),
            sampleRate: 44100,
            bitrate: 128,
        } as AudioAnalysisResult;
    }
    
    async getDuration(filePath: string): Promise<number> {
        console.log(`Analyzing duration of: ${filePath}`);

        return 10;
    }
    
    async generateWaveform(inputPath: string, outputPath: string, width?: number, height?: number): Promise<string> {
        console.log(`Generating Waveform for: ${inputPath}`);
        
        return "Waveform";
    }
    
    private getRandomKey(): string {
        const keys = ["A", 'A#', "B", "C", "C#"];
        const modes = ["min", "maj"];
        
        const randomKey = `${keys[Math.floor(Math.random() * keys.length)]} ${modes[Math.floor(Math.random() * modes.length)]}`;

        return randomKey;
    }
}