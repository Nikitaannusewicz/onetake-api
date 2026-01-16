import { createDatabase } from '../src/modules/assets/infrastructure/database/database';
import { down, up } from '../src/modules/assets/infrastructure/database/migrations/001_create_assets_table';

async function resetDatabase() {
    const db = createDatabase();

    console.log('Resetting database...');

    try {
        console.log('Dropping existing tables...');
        await down(db);
        console.log('✓ Tables dropped');

        console.log('Creating tables with new schema...');
        await up(db);
        console.log('✓ Tables created');

        console.log('\nDatabase reset completed successfully!');
    } catch (error) {
        console.error('✗ Database reset failed:', error);
        process.exit(1);
    } finally {
        await db.destroy();
    }
}

resetDatabase();
