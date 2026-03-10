import { Layout } from "../layout.js";
import { app } from "../main.js";

app.get("/results", async (c) => {
  return c.html(
    <Layout>
      <div class="w-full h-full items-center justify-center bg-black text-white flex flex-col">
        <a class="underline" href="/">
          Back
        </a>
        <h2 class="text-2xl font-bold">TODO: Results etc.</h2>
      </div>
    </Layout>,
  );
});
