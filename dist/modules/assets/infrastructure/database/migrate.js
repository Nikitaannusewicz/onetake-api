"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const _001_create_assets_table_1 = require("./migrations/001_create_assets_table");
async function migrate() {
    const db = (0, database_1.createDatabase)();
    try {
        console.log('Running migrations...');
        await (0, _001_create_assets_table_1.up)(db);
    }
    catch (error) {
        console.error(`Migration failed`, error);
        throw error;
    }
    finally {
        await db.destroy();
    }
}
migrate();
//# sourceMappingURL=migrate.js.map