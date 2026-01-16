import { Kysely, SqliteDialect } from "kysely";
import SQLite from 'better-sqlite3';
import { Database as SchemaDatabase } from "better-sqlite3";
import * as path from 'path';

export function createDatabase(): Kysely<SchemaDatabase> {
    // Use project root to ensure same DB file is used in dev and production
    const dbPath = path.join(process.cwd(), 'data', 'onetake.db');

    const sqlite = new SQLite(dbPath);
    
    const dialect = new SqliteDialect({
        database: sqlite,
    })

    sqlite.pragma('foreign_keys = ON');
    sqlite.pragma('journal_mode = WAL');
    
    return new Kysely<SchemaDatabase>({
        dialect,
    })
}