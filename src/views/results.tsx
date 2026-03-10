import { SSEStreamingApi, streamSSE } from "hono/streaming";
import { Layout } from "../layout.js";
import { app } from "../main.js";
import { getScoreForLatestQuestion, type Score } from "../service/questions.js";

app.get("/results", async (c) => {
  return c.html(
    <Layout>
      <div class="w-3/5 h-full items-center justify-center text-white flex flex-col mx-auto">
        <a class="underline" href="/">
          Back
        </a>
        <h2 class="text-2xl font-bold">Results</h2>

        <div class="w-full">Results will be updated here</div>
      </div>
    </Layout>,
  );
});

// TODO: Implement SSE
// TODO: Create function to update score for all SSE streams

// TODO: Use Results component
function Results({ score }: { score?: Score }) {
  return (
    <ul class="text-xl w-full">
      {score &&
        Object.entries(score.votes).map(([key, val], i) => (
          <li class="relative">
            <div
              class={`absolute h-full top-0 left-0 z-0 transition-all ${colors[i]}`}
              style={`width: ${calculateWidth(val, score.totalVotes)};`}
            ></div>
            <p class="relative z-10">
              <b>{key}.</b> {val}
            </p>
          </li>
        ))}
    </ul>
  );
}

function calculateWidth(votes: number, totalVotes: number) {
  return Math.floor((votes / totalVotes) * 100) + "%";
}

const colors = ["bg-[#FF6D00]", "bg-[#F7435E]", "bg-[#C6468C]", "bg-[#415481]"];
