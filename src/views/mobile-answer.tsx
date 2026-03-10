import { randomUUID } from "crypto";
import { db } from "../db/database.js";
import { app } from "../main.js";
import { updateScore } from "./results.js";

app.post("/mobile/answer", async (c) => {
  const formData = await c.req.formData();

  const questionId = formData.get("question-id")?.toString();
  if (!questionId) {
    throw new Error("");
  }

  db.insertInto("answer")
    .values({
      answerer_id: randomUUID(), // TODO: Fix
      question_id: questionId,
      choice: formData.get("choice") as string,
    })
    .execute();

  updateScore();

  return c.html(<p>Thank you for your answer!</p>);
});
