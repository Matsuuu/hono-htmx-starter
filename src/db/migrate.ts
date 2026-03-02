import { sql } from "kysely";
import { db } from "./database.js";

export async function migrate() {
  await db.schema
    .createTable("uptime")
    .addColumn("id", "uuid", (cb) => cb.primaryKey().notNull())
    .addColumn("time", "integer", (cb) => cb.notNull().defaultTo(0))
    .addColumn("created_at", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`current_timestamp`),
    )
    .execute();
}

// only run when executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}
