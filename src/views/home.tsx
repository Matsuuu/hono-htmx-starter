import { Clock } from "lucide-static";
import { LucideIcon } from "../icons/lucide.js";
import { Layout } from "../layout.js";
import { app } from "../main.js";

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

let seconds = 0;

setInterval(() => {
  seconds++;
}, 1000);

app.get("/uptime-counter", (c) => {
  return c.html(
    <>
      {LucideIcon(Clock)}

      <p class="inline">This server has been up for {seconds} seconds.</p>
    </>,
  );
});
