import { promisify } from "util";
import { exec } from 'child_process';
import { AudioMetaData, IAudioProcessingService } from "../../application/interfaces/audio-processing.interface";
import { Injectable } from "@nestjs/common";

const execAsync = promisify(exec);

@Injectable()
export class FfmpegAudioProcessingService implements IAudioProcessingService {
    async transcode(inputPath: string, outputPath: string): Promise<string> {
        try {
            const isReady = await this.isStreamReady(inputPath);
            if (isReady) {
                console.log(`File already optimized for streaming: ${inputPath}`);
                return inputPath;
            }
            
            console.log(`Transcoding: ${inputPath} -> ${outputPath}`);
            
            const command = [
                'ffmpeg', // Input file
                '-i', inputPath, // Use MP3 encoder
                '-codec:a', 'libmp3lame', // Bitrate 128kbps
                '-b:a', '128k', // Sample rate 44.1kHz
                '-ar', '44100', // Stereo (2 channels)
                '-ac', '2', // Overwrite output file
                '-y', // Output file
                outputPath
            ];

            const { stderr } = await execAsync(command.join(' '));
            
            console.log(`Transcoding complete: ${outputPath}`);
            if (stderr && stderr.includes('error')) {
                console.error(`FFmpeg warnings/errors: ${stderr.substring(0, 300)}`);
            }

            return outputPath;
        } catch (error) {
            console.error(`Transcoding failed: ${error.message}`);
            throw new Error(`Failed to transcode audio: ${error.message}`);
        }
    }
    
    async analyze(filePath: string): Promise<AudioMetaData> {
        try {
            console.log(`Analyzing audio file: ${filePath}`);
            
            const command = [
                'ffprobe',
                '-v', 'error', // Only show errors
                '-show_entries', 'format=duration,bit_rate,format_name', // Format info
                '-show_entries', 'stream=codec_name,sample_rate,channels', // Stream info
                '-of', 'json', // Output as JSON
                filePath
            ];
            
            const { stdout } = await execAsync(command.join(' '));
            const result = JSON.parse(stdout);
            
            // Extract metadata from ffprobe output
            const format = result.format || {};
            const stream = result.streams?.[0] || {};
            
            const metadata: AudioMetaData = {
                duration: format.duration ? Math.round(parseFloat(format.duration)) : 0,
                bitrate: format.bit_rate ? Math.round(parseInt(format.bit_rate) / 1000): undefined,
                sampleRate: stream.sample_rate ? parseInt(stream.sample_rate) : undefined,
                channels: stream.channels ? parseInt(stream.channels) : undefined,
                format: format.format_name?.split(',')[0] || undefined,
                codec: stream.codec_name || undefined,
            };
            
            console.log(`Analysis complete:`, metadata);
            return metadata;
        } catch (error) {
            console.error(`Analysis failed: ${error.message}`);
            throw new Error(`Failed to analyze audio: ${error.message}`);
        }
    }
    
    async isStreamReady(filePath: string): Promise<boolean> {
        try {
            if (filePath.toLowerCase().endsWith('.mp3')) {
                const metadata = await this.analyze(filePath);
                
                if (metadata.bitrate && metadata.bitrate <= 192) {
                    return true;
                } 
            }
            
            return false;
        } catch (error) {
            console.error(`Error checking stream readiness: ${error.message}`);
            return false;
        }
    }
}