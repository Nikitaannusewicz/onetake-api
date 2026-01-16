import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('assets')
        .addColumn('id', 'text', (col) => col.primaryKey())
        .addColumn('original_file_name', 'text', (col) => col.notNull())
        .addColumn('mime_type', 'text', (col) => col.notNull())
        .addColumn('size', 'integer', (col) => col.notNull())
        .addColumn('duration', 'integer', (col) => col.notNull())
        .addColumn('file_path', 'text', (col) => col.notNull().unique())
        .addColumn('transcoded_file_path', 'text')
        .addColumn('owner_id', 'text', (col) => col.notNull())
        .addColumn('status', 'text', (col) => col.notNull())
        .addColumn('bpm', 'integer')
        .addColumn('key', 'text')
        .addColumn('created_at', 'text', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
        )
        .addColumn('updated_at', 'text', (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
        )
        .execute();
    
        await db.schema
            .createIndex('idx_assets_owner_id')
            .on('assets')
            .column('owner_id')
            .execute();
    
        await db.schema
            .createIndex('idx_assets_status')
            .on('assets')
            .column('status')
            .execute();
    
        await db.schema
            .createIndex('idx_assets_bpm')
            .on('assets')
            .column('bpm')
            .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('assets').execute();
}