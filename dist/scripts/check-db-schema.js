"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../src/modules/assets/infrastructure/database/database");
const kysely_1 = require("kysely");
async function checkSchema() {
    const db = (0, database_1.createDatabase)();
    try {
        console.log('Checking assets table schema...\n');
        const result = await (0, kysely_1.sql) `PRAGMA table_info(assets)`.execute(db);
        console.log('Current schema:');
        console.table(result.rows);
        await db.destroy();
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
checkSchema();
//# sourceMappingURL=check-db-schema.js.map