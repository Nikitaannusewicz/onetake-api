import { createDatabase } from '../database';
import { up } from './001_create_assets_table';
import * as fs from 'fs';
import * as path from 'path';

async function runMigrations() {
    const db = createDatabase();

    console.log('Running migrations...');

    try {
        await up(db);
        console.log('✓ Migration 001_create_assets_table completed successfully');
    } catch (error) {
        console.error('✗ Migration failed:', error);
        process.exit(1);
    } finally {
        await db.destroy();
    }

    console.log('All migrations completed successfully!');
}

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory:', dataDir);
}

runMigrations().catch((error) => {
    console.error('Failed to run migrations:', error);
    process.exit(1);
});
