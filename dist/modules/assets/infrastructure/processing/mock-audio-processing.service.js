"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAudioProcessing = void 0;
const common_1 = require("@nestjs/common");
let MockAudioProcessing = class MockAudioProcessing {
    async transcode(inputPath, outputPath, options) {
        console.log(`[Audio] Transcoding ${inputPath} -> ${outputPath}`);
        console.log(`Format: ${options.targetFormat} | Bitrate: ${options.bitrate}`);
        console.log(`[Audio] Transcode complete`);
    }
    async analyze(filePath) {
        console.log(`Analyzing file: ${filePath}`);
        return {
            duration: 160,
            bpm: 120,
            key: this.getRandomKey(),
            sampleRate: 44100,
            bitrate: 128,
        };
    }
    ;
    async getDuration(filePath) {
        console.log(`Analyzing duration of: ${filePath}`);
        return 10;
    }
    async generateWaveform(inputPath, outputPath, width, height) {
        console.log(`Generating Waveform for: ${inputPath}`);
        return "Waveform";
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getRandomKey() {
        const keys = ["A", 'A#', "B", "C", "C#"];
        const modes = ["min", "maj"];
        const randomKey = `${[Math.floor(Math.random() * keys.length)]} ${modes[Math.floor(Math.random() * modes.length)]}`;
        return `${[Math.floor(Math.random() * keys.length)]} ${modes[Math.floor(Math.random() * modes.length)]}`;
    }
};
exports.MockAudioProcessing = MockAudioProcessing;
exports.MockAudioProcessing = MockAudioProcessing = __decorate([
    (0, common_1.Injectable)()
], MockAudioProcessing);
//# sourceMappingURL=mock-audio-processing.service.js.map