import { randomUUID } from "node:crypto";
import { db } from "./database.js";

export async function add() {
  await db
    .insertInto("question")
    .values({
      id: randomUUID(),
      text: "Have you bought a ticket to Future Frontend yet?",
      choice1: "Yes",
      choice2: "Yes",
      choice3: "Yes",
      choice4: "!No",
    })
    .execute();
}

// only run when executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
  add();
}
