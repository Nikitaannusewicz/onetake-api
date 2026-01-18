"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockFileStorageService = void 0;
const common_1 = require("@nestjs/common");
let MockFileStorageService = class MockFileStorageService {
    files = new Map();
    async save(file, folder) {
        const basePath = folder || 'uploads';
        const timeStamp = Date.now();
        const filePath = `${basePath}/${timeStamp}-${file.originalName}`;
        this.files.set(filePath, file.buffer);
        console.log(`File has been saved: ${filePath}`);
        return filePath;
    }
    async getStream(filePath) {
        const stream = 123;
        return stream;
    }
    async getFile(filePath) {
        const file = this.files.get(filePath) || null;
        return file;
    }
    async delete(filePath) {
        const deleted = this.files.delete(filePath);
        return deleted;
    }
    async exists(filePath) {
        const exists = this.files.has(filePath);
        return exists;
    }
    getUrl(filePath) {
        const url = `http://localhost:3000/stream/${filePath}`;
        return url;
    }
};
exports.MockFileStorageService = MockFileStorageService;
exports.MockFileStorageService = MockFileStorageService = __decorate([
    (0, common_1.Injectable)()
], MockFileStorageService);
//# sourceMappingURL=mock-file-storage.service.js.map