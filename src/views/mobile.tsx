import { Layout } from "../layout.js";
import { app } from "../main.js";
import { ensureCookie } from "../service/cookie.js";
import { getAnswerForUser, getLatestQuestion } from "../service/questions.js";

app.get("/mobile", async (c) => {
  const latestQuestion = await getLatestQuestion();

  // TODO: Get the user's answer to question and disable answer if already done

  const userId = ensureCookie(c);

  const answer = await getAnswerForUser(latestQuestion?.id as string, userId);
  console.log(answer);

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

            {!answer && (
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
            )}

            {answer && (
              <p>
                You already answered this one! You said <b>{answer.choice}</b>
              </p>
            )}
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
      class="border border-white px-4 py-2 hover:bg-[#FFFFFF30]"
    >
      {data}
    </button>
  );
}
