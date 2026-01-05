import type { ServerLoadEvent } from "@sveltejs/kit";
import type { D1Database } from "@cloudflare/workers-types";

export let db: D1Database | null = null;

export function setDb(inputDatabase: D1Database) {
    db ??= inputDatabase;
    console.log('database:', db)
}

export function getDb(event: ServerLoadEvent): D1Database {
    const db = event.platform?.env?.DB;
    if (!db) {
        throw new Error("Database not available");
    }
    return db;
}