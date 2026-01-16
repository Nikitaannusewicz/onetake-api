import { createDatabase } from "./database";
import { up as createAssetsTable } from './migrations/001_create_assets_table';

async function migrate() {
    const db = createDatabase();

    try {
        console.log('Running migrations...');
        await createAssetsTable(db);
        console.log('Migration run successfully!');
    } catch(error) {
        console.error(`Migration failed`, error);
        throw error;
    } finally {
        await db.destroy();
    }
}

migrate();