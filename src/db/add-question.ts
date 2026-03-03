import { randomUUID } from "crypto";
import { db } from "./database.js";

export async function add() {
  await db
    .insertInto("question")
    .values({
      id: randomUUID(),
      text: "What's your favorite framework?",
      choice1: "Vue",
      choice2: "React",
      choice3: "Angular",
      choice4: "No framework for me!",
    })
    .execute();
}

// only run when executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
  add();
}
