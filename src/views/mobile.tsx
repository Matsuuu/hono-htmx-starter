import { db } from "../db/database.js";
import { Layout } from "../layout.js";
import { app } from "../main.js";

app.get("/mobile", async (c) => {
  const latestQuestion = await db
    .selectFrom("question")
    .select(["id", "text", "choice1", "choice2", "choice3", "choice4"])
    .orderBy("created_at", "desc")
    .executeTakeFirst();

  return c.html(
    <Layout>
      <div class="w-full h-full items-center justify-center bg-black text-white flex flex-col gap-4">
        <a class="underline" href="/">
          Back
        </a>
        {!latestQuestion && <p class="text-xl">No question available</p>}

        {latestQuestion && (
          <>
            <h2 class="text-xl font-semibold">{latestQuestion.text}</h2>
            <form class="flex flex-col gap-2" hx-post="/mobile/answer">
              <input
                type="text"
                name="question-id"
                value={latestQuestion.id}
                class="hidden"
              />

              <Choice data={latestQuestion.choice1} />
              <Choice data={latestQuestion.choice2} />
              <Choice data={latestQuestion.choice3} />
              <Choice data={latestQuestion.choice4} />
            </form>
          </>
        )}
      </div>
    </Layout>,
  );
});

function Choice({ data }: { data: string }) {
  return (
    <button
      name="choice"
      type="submit"
      value={data}
      class="border-1 border-white px-4 py-2 hover:bg-[#FFFFFF30]"
    >
      {data}
    </button>
  );
}
