import { randomUUID } from "crypto";
import { db } from "../db/database.js";
import { app } from "../main.js";

app.post("/mobile/answer", async (c) => {
  const formData = await c.req.formData();

  db.insertInto("answer")
    .values({
      answerer_id: randomUUID(), // TODO: Actual user cookie id
      question_id: formData.get("question-id") as string,
      choice: formData.get("choice") as string,
    })
    .execute();

  return c.html(<p>Thank you for your answer!</p>);
});
