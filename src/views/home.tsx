import { Clock } from "lucide-static";
import { LucideIcon } from "../icons/lucide.js";
import { Layout } from "../layout.js";
import { app, APP_ID } from "../main.js";
import { db } from "../db/database.js";

app.get("/", async (c) => {
  return c.html(
    <Layout>
      <div class="w-full h-full items-center justify-center bg-black text-white flex flex-col">
        <h2 class="text-2xl font-bold">Hello world</h2>

        <div
          class="flex gap-2"
          hx-get="/uptime-counter"
          hx-trigger="load, every 1000"
          hx-swap="innerHTML"
        >
          <p>Loading...</p>
        </div>
      </div>
    </Layout>,
  );
});

app.get("/uptime-counter", async (c) => {
  const row = await db
    .selectFrom("uptime") //
    .select("time")
    .where("id", "=", APP_ID)
    .executeTakeFirst();

  return c.html(
    <>
      {LucideIcon(Clock)}

      <p class="inline">This server has been up for {row?.time} seconds.</p>
    </>,
  );
});
