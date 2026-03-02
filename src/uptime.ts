import { db } from "./db/database.js";
import { APP_ID } from "./main.js";

declare global {
  // for TS
  // eslint-disable-next-line no-var
  var __counterInterval: NodeJS.Timeout | undefined;
}

export function startUptime() {
  if (import.meta.env.DEV) {
    if (globalThis.__counterInterval != null) {
      clearInterval(globalThis.__counterInterval);
    }
  }

  db.insertInto("uptime")
    .values({
      id: APP_ID,
    })
    .execute();

  globalThis.__counterInterval = setInterval(async () => {
    const result = await db
      .updateTable("uptime") //
      .set((eb) => ({ time: eb("time", "+", 1) }))
      .where("id", "=", APP_ID)
      .execute();
  }, 1000);
}
