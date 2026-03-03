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

  await db.schema
    .createTable("question")
    .addColumn("id", "uuid", (cb) => cb.primaryKey().notNull())
    .addColumn("text", "text", (cb) => cb.notNull())
    .addColumn("choice1", "text", (cb) => cb.notNull())
    .addColumn("choice2", "text", (cb) => cb.notNull())
    .addColumn("choice3", "text", (cb) => cb.notNull())
    .addColumn("choice4", "text", (cb) => cb.notNull())
    .addColumn("created_at", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`current_timestamp`),
    )
    .execute();

  await db.schema
    .createTable("answer")
    .addColumn("question_id", "uuid", (cb) =>
      cb.references("question.id").onDelete("cascade").notNull(),
    )
    .addColumn("answerer_id", "uuid", (cb) => cb.notNull())
    .addColumn("choice", "text", (cb) => cb.notNull())
    .addColumn("created_at", "timestamp", (cb) =>
      cb.notNull().defaultTo(sql`current_timestamp`),
    )
    .execute();
}

// only run when executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}
