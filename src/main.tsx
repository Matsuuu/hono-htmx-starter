import { Hono } from "hono";

export const app = new Hono();

// Initialize all of our views
const views = import.meta.glob("./views/*.tsx");
// Loop through and await each import to popularize router endpoints
for (const view in views) {
  await views[view]();
}
