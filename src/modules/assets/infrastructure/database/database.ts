import { Kysely, SqliteDialect } from "kysely";
import SQLite from 'better-sqlite3';
import { Database } from "better-sqlite3";
import * as path from 'path';

export function createDatabase(): Kysely<Database> {
    const dbPath = path.join(__dirname, 'migrations/onetake.db');
    
    const sqlite = new SQLite(dbPath);
    
    const dialect = new SqliteDialect({
        database: sqlite,
    })

    sqlite.pragma('foreign_keys = ON');
    sqlite.pragma('journal_mode = WAL');
    
    return new Kysely<Database>({
        dialect,
    })
}