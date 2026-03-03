import { Clock } from "lucide-static";
import { LucideIcon } from "../icons/lucide.js";
import { Layout } from "../layout.js";
import { app, APP_ID } from "../main.js";
import { db } from "../db/database.js";

app.get("/results", async (c) => {
  return c.html(
    <Layout>
      <div class="w-full h-full items-center justify-center bg-black text-white flex flex-col">
        <h2 class="text-2xl font-bold">TODO: Results etc.</h2>
      </div>
    </Layout>,
  );
});
