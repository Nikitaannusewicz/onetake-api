"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../src/modules/assets/infrastructure/database/database");
const _001_create_assets_table_1 = require("../src/modules/assets/infrastructure/database/migrations/001_create_assets_table");
async function resetDatabase() {
    const db = (0, database_1.createDatabase)();
    console.log('Resetting database...');
    try {
        console.log('Dropping existing tables...');
        await (0, _001_create_assets_table_1.down)(db);
        console.log('✓ Tables dropped');
        console.log('Creating tables with new schema...');
        await (0, _001_create_assets_table_1.up)(db);
        console.log('✓ Tables created');
        console.log('\nDatabase reset completed successfully!');
    }
    catch (error) {
        console.error('✗ Database reset failed:', error);
        process.exit(1);
    }
    finally {
        await db.destroy();
    }
}
resetDatabase();
//# sourceMappingURL=reset-db.js.map