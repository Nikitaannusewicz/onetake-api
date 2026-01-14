"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('assets')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('original_file_name', 'varchar', (col) => col.notNull())
        .addColumn('mime_type', 'text', (col) => col.notNull())
        .addColumn('size', 'integer', (col) => col.notNull())
        .addColumn('file_path', 'text', (col) => col.notNull().unique())
        .addColumn('transcoded_file_path', 'varchar', (col) => col.notNull().unique())
        .addColumn('owner_id', 'text', (col) => col.notNull())
        .addColumn('status', 'text', (col) => col.notNull())
        .addColumn('bpm', 'integer')
        .addColumn('key', 'text')
        .addColumn('created_at', 'text', (col) => col.defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP()`).notNull())
        .addColumn('updated_at', 'text', (col) => col.defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP()`).notNull())
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
async function down(db) {
    await db.schema.dropTable('assets').execute();
}
//# sourceMappingURL=001_create_assets_table.js.map