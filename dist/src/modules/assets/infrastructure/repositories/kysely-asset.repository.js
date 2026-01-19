"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KyselyAssetRepository = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const entity_1 = require("../../domain/entity");
let KyselyAssetRepository = class KyselyAssetRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async save(asset) {
        const row = {
            id: asset.id,
            original_file_name: asset.originalFileName,
            mime_type: asset.mimeType,
            size: asset.size,
            duration: asset.duration,
            file_path: asset.filePath,
            transcoded_file_path: asset.transcodedFilePath || null,
            owner_id: asset.ownerId,
            status: asset.status,
            bpm: asset.bpm || null,
            key: asset.key || null,
        };
        await this.db
            .insertInto('assets')
            .values(row)
            .onConflict((oc) => oc.column('id').doUpdateSet({
            original_file_name: row.original_file_name,
            mime_type: row.mime_type,
            size: row.size,
            duration: row.duration,
            file_path: row.file_path,
            transcoded_file_path: row.transcoded_file_path,
            owner_id: row.owner_id,
            status: row.status,
            bpm: row.bpm,
            key: row.key,
            updated_at: (0, kysely_1.sql) `CURRENT_TIMESTAMP`,
        }))
            .execute();
        return asset;
    }
    async findById(id) {
        const row = await this.db.selectFrom('assets').selectAll().where('id', '=', id).executeTakeFirst();
        if (!row) {
            return null;
        }
        return entity_1.Asset.reconstitute(row.id, row.original_file_name, row.mime_type, row.size, row.duration, row.file_path, row.owner_id, row.created_at, row.updated_at, row.status, row.transcoded_file_path ?? undefined, row.bpm ?? undefined, row.key ?? undefined);
    }
    async findByOwnerId(ownerId) {
        const rows = await this.db.selectFrom('assets').selectAll().where('owner_id', '=', ownerId).execute();
        return rows.map((row) => entity_1.Asset.reconstitute(row.id, row.original_file_name, row.mime_type, row.size, row.duration, row.file_path, row.owner_id, row.created_at, row.updated_at, row.status, row.transcoded_file_path ?? undefined, row.bpm ?? undefined, row.key ?? undefined));
    }
    async findAll(filters) {
        let query = this.db.selectFrom('assets').selectAll();
        if (filters?.ownerId) {
            query = query.where('owner_id', '=', filters.ownerId);
        }
        if (filters?.status) {
            query = query.where('status', '=', filters.status);
        }
        if (filters?.minBpm !== undefined) {
            query = query.where('bpm', '>=', filters.minBpm);
        }
        if (filters?.maxBpm !== undefined) {
            query = query.where('bpm', '<=', filters.maxBpm);
        }
        if (filters?.key) {
            query = query.where('key', '=', filters.key);
        }
        const rows = await query.execute();
        return rows.map(row => entity_1.Asset.reconstitute(row.id, row.original_file_name, row.mime_type, row.size, row.duration, row.file_path, row.owner_id, row.created_at, row.updated_at, row.status, row.transcoded_file_path ?? undefined, row.bpm ?? undefined, row.key ?? undefined));
    }
    async delete(id) {
        const result = await this.db
            .deleteFrom('assets')
            .where('id', '=', id)
            .executeTakeFirst();
        return (result.numDeletedRows ?? 0n) > 0n;
    }
    async exists(id) {
        const exists = await this.db.selectFrom('assets').where('id', '=', id).executeTakeFirst();
        if (!exists) {
            return false;
        }
        return true;
    }
};
exports.KyselyAssetRepository = KyselyAssetRepository;
exports.KyselyAssetRepository = KyselyAssetRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE')),
    __metadata("design:paramtypes", [kysely_1.Kysely])
], KyselyAssetRepository);
//# sourceMappingURL=kysely-asset.repository.js.map