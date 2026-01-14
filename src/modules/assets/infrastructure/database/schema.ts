import { ColumnType } from "kysely";

export interface AssetsTable {
    id: string;
    original_file_name: string;
    mime_type: string;
    size: number;
    duration: number;
    file_path: string;
    transcoded_file_path: string | null;
    owner_id: string;
    status: 'UPLOADED' | 'PROCESSING' | 'READY' | 'FAILED';
    bpm: number | null;
    key: string | null;
    created_at: ColumnType<Date, string | undefined, never>;
    updated_at: ColumnType<Date, string | undefined, string>;
}

export interface Database {
    assets: AssetsTable;
}