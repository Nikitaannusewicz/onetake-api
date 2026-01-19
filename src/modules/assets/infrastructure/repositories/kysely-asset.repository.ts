import { Inject, Injectable } from "@nestjs/common";
import { Kysely, sql } from "kysely";
import { Asset, AssetStatus } from "../../domain/entity";
import { AssetFilterOptions, IAssetRepository } from "../../application/interfaces/asset-repository.interface";
import { Database, AssetsTable } from "../database/schema";

@Injectable()
export class KyselyAssetRepository implements IAssetRepository {
    constructor(
        @Inject('DATABASE')
        private readonly db: Kysely<Database>,
    ) {}
    async save(asset: Asset): Promise<Asset> {
        const row: Omit<AssetsTable, 'created_at' | 'updated_at'> = {
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
        }

        await this.db
            .insertInto('assets')
            .values(row)
            .onConflict((oc) =>
                oc.column('id').doUpdateSet({
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
                    updated_at: sql`CURRENT_TIMESTAMP`,
                })
            )
            .execute();

        return asset;
    }
    
    async findById(id: string): Promise<Asset | null> {
        const row = await this.db.selectFrom('assets').selectAll().where('id', '=', id).executeTakeFirst();
    
        if (!row) {
            return null;
        }
        
        return Asset.reconstitute(
            row.id,
            row.original_file_name,
            row.mime_type,
            row.size,
            row.duration,
            row.file_path,
            row.owner_id,
            row.created_at,
            row.updated_at,
            row.status as AssetStatus,
            row.transcoded_file_path ?? undefined,
            row.bpm ?? undefined,
            row.key ?? undefined,
        )
    }
    
    async findByOwnerId(ownerId: string): Promise<Asset[]> {
        const rows = await this.db.selectFrom('assets').selectAll().where('owner_id', '=', ownerId).execute();
        
        return rows.map((row) => Asset.reconstitute(
            row.id,
            row.original_file_name,
            row.mime_type,
            row.size,
            row.duration,
            row.file_path,
            row.owner_id,
            row.created_at,
            row.updated_at,
            row.status as AssetStatus,
            row.transcoded_file_path ?? undefined,
            row.bpm ?? undefined,
            row.key ?? undefined,
        ));
    }
    
    async findAll(filters?: AssetFilterOptions): Promise<Asset[]> {
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

        return rows.map(row => Asset.reconstitute(
            row.id,
            row.original_file_name,
            row.mime_type,
            row.size,
            row.duration,
            row.file_path,
            row.owner_id,
            row.created_at,
            row.updated_at,
            row.status as AssetStatus,
            row.transcoded_file_path ?? undefined,
            row.bpm ?? undefined,
            row.key ?? undefined,
        ));
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await this.db
            .deleteFrom('assets')
            .where('id', '=', id)
            .executeTakeFirst();

        return (result.numDeletedRows ?? 0n) > 0n;
    }
    
    async exists(id: string): Promise<boolean> {
        const exists = await this.db.selectFrom('assets').where('id', '=', id).executeTakeFirst();

        if (!exists) {
            return false;
        }
        
        return true;
    }
}
