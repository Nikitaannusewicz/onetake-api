import { Kysely } from "kysely";
import { Database as SchemaDatabase } from "better-sqlite3";
export declare function createDatabase(): Kysely<SchemaDatabase>;
