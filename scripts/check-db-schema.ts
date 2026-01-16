import { createDatabase } from '../src/modules/assets/infrastructure/database/database';
import { sql } from 'kysely';

async function checkSchema() {
    const db = createDatabase();

    try {
        console.log('Checking assets table schema...\n');

        const result = await sql`PRAGMA table_info(assets)`.execute(db);

        console.log('Current schema:');
        console.table(result.rows);

        await db.destroy();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkSchema();
