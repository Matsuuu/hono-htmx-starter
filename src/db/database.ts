import type { DB } from "./db.d.ts"; // this is the Database interface we defined earlier
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const dialect = new SqliteDialect({
  database: new SQLite("./db.sqlite"),
});

export const db = new Kysely<DB>({
  dialect,
});
