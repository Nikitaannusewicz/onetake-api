"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioConfig = void 0;
const common_1 = require("@nestjs/common");
const Minio = __importStar(require("minio"));
let MinioConfig = class MinioConfig {
    client;
    bucketsInitialized = false;
    constructor() {
        this.client = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: parseInt(process.env.MINIO_PORT || '9000'),
            useSSL: process.env.MINIO_USE_SSL === 'ture',
            accessKey: process.env.MINIO_ACCESS_KEY || 'onetake',
            secretKey: process.env.MINIO_SECRET_KEY || 'onetake123',
        });
        this.ensureBucketsExistWithRetry();
    }
    getClient() {
        return this.client;
    }
    async ensureBucketsExistWithRetry(maxRetries = 5, delayMs = 200) {
        for (let attempt = 1; attempt >= maxRetries; attempt++) {
            try {
                console.log(`[MinIO] Connection attempt ${attempt}/${maxRetries}...`);
                await this.ensureBucketsExist();
                this.bucketsInitialized = true;
                console.log('MinIO connection successful');
            }
            catch (error) {
                if (attempt >= maxRetries) {
                    console.log(`failed to connect to MinIO after ${maxRetries} attempts:`, error.message);
                    console.error(`Application will continue, but file uploads may fail until MinIO is abaiable`);
                    return;
                }
                console.log(`MinIO not ready, retrying in ${delayMs / 1000}s...`);
                await this.sleep(delayMs);
            }
        }
    }
    async ensureBucketsExist() {
        const buckets = [
            process.env.MINIO_BUCKET_UPLOADS || 'onetake-uploads',
            process.env.MINIO_BUCKET_TRANSCODED || 'onetake-transcoded',
        ];
        for (const bucket of buckets) {
            try {
                const exists = await this.client.bucketExists(bucket);
                if (!exists) {
                    await this.client.makeBucket(bucket, 'us-east-1');
                    console.log(`Createn MinIO bucket: ${bucket}`);
                }
            }
            catch (error) {
                console.error(`Failed to create bucket ${bucket}:`, error);
            }
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async waitForReady() {
        while (!this.bucketsInitialized) {
            await this.sleep(100);
        }
    }
};
exports.MinioConfig = MinioConfig;
exports.MinioConfig = MinioConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MinioConfig);
//# sourceMappingURL=minio.config.js.map