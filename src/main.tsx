import { Hono } from "hono";
import { randomUUID } from "node:crypto";
import { startUptime } from "./uptime.js";
import { db } from "./db/database.js";

export const app = new Hono();
export const APP_ID = randomUUID();

startUptime();

// Initialize all of our views
const views = import.meta.glob("./views/*.tsx");
// Loop through and await each import to popularize router endpoints
for (const view in views) {
  await views[view]();
}
