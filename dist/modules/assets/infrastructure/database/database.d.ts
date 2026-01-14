import { Kysely } from "kysely";
import { Database } from "better-sqlite3";
export declare function createDatabase(): Kysely<Database>;
