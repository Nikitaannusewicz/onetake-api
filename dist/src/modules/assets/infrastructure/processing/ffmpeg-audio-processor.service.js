"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegAudioProcessingService = void 0;
const util_1 = require("util");
const child_process_1 = require("child_process");
const common_1 = require("@nestjs/common");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let FfmpegAudioProcessingService = class FfmpegAudioProcessingService {
    async transcode(inputPath, outputPath) {
        try {
            const isReady = await this.isStreamReady(inputPath);
            if (isReady) {
                console.log(`File already optimized for streaming: ${inputPath}`);
                return inputPath;
            }
            console.log(`Transcoding: ${inputPath} -> ${outputPath}`);
            const command = [
                'ffmpeg',
                '-i', inputPath,
                '-codec:a', 'libmp3lame',
                '-b:a', '128k',
                '-ar', '44100',
                '-ac', '2',
                '-y',
                outputPath
            ];
            const { stderr } = await execAsync(command.join(' '));
            console.log(`Transcoding complete: ${outputPath}`);
            if (stderr && stderr.includes('error')) {
                console.error(`FFmpeg warnings/errors: ${stderr.substring(0, 300)}`);
            }
            return outputPath;
        }
        catch (error) {
            console.error(`Transcoding failed: ${error.message}`);
            throw new Error(`Failed to transcode audio: ${error.message}`);
        }
    }
    async analyze(filePath) {
        try {
            console.log(`Analyzing audio file: ${filePath}`);
            const command = [
                'ffprobe',
                '-v', 'error',
                '-show_entries', 'format=duration,bit_rate,format_name',
                '-show_entries', 'stream=codec_name,sample_rate,channels',
                '-of', 'json',
                filePath
            ];
            const { stdout } = await execAsync(command.join(' '));
            const result = JSON.parse(stdout);
            const format = result.format || {};
            const stream = result.streams?.[0] || {};
            const metadata = {
                duration: format.duration ? Math.round(parseFloat(format.duration)) : 0,
                bitrate: format.bit_rate ? Math.round(parseInt(format.bit_rate) / 1000) : undefined,
                sampleRate: stream.sample_rate ? parseInt(stream.sample_rate) : undefined,
                channels: stream.channels ? parseInt(stream.channels) : undefined,
                format: format.format_name?.split(',')[0] || undefined,
                codec: stream.codec_name || undefined,
            };
            console.log(`Analysis complete:`, metadata);
            return metadata;
        }
        catch (error) {
            console.error(`Analysis failed: ${error.message}`);
            throw new Error(`Failed to analyze audio: ${error.message}`);
        }
    }
    async isStreamReady(filePath) {
        try {
            if (filePath.toLowerCase().endsWith('.mp3')) {
                const metadata = await this.analyze(filePath);
                if (metadata.bitrate && metadata.bitrate <= 192) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            console.error(`Error checking stream readiness: ${error.message}`);
            return false;
        }
    }
};
exports.FfmpegAudioProcessingService = FfmpegAudioProcessingService;
exports.FfmpegAudioProcessingService = FfmpegAudioProcessingService = __decorate([
    (0, common_1.Injectable)()
], FfmpegAudioProcessingService);
//# sourceMappingURL=ffmpeg-audio-processor.service.js.map