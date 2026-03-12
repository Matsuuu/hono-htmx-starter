import { randomUUID } from "crypto";
import { db } from "../db/database.js";
import { app } from "../main.js";
import { ensureCookie } from "../service/cookie.js";
import { getAnswerForUser } from "../service/questions.js";
import { updateScore } from "./results.js";

app.get("/any", (c) => {
  return c.json({
    foo: "bar",
  });
});

app.post("/mobile/answer", async (c) => {
  const formData = await c.req.formData();

  const questionId = formData.get("question-id")?.toString();
  if (!questionId) {
    throw new Error("");
  }

  const userId = ensureCookie(c);

  await db
    .insertInto("answer")
    .values({
      answerer_id: userId,
      question_id: questionId,
      choice: formData.get("choice") as string,
    })
    .execute();

  return c.html(<p>Thank you for your answer!</p>);
});
