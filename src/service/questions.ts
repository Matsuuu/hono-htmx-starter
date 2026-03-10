import { db } from "../db/database.js";

export async function getLatestQuestion() {
  return await db
    .selectFrom("question")
    .select(["id", "text", "choice1", "choice2", "choice3", "choice4"])
    .orderBy("created_at", "desc")
    .executeTakeFirst();
}

export interface Score {
  votes: Record<string, number>;
  totalVotes: number;
}

export async function getScoreForLatestQuestion() {
  const question = await getLatestQuestion();

  if (!question) {
    return undefined;
  }

  const score = await db
    .selectFrom("answer")
    .select(["choice", "answerer_id"])
    .where("question_id", "=", question?.id)
    .execute();

  const groupedScore = score.reduce(
    (acc, s) => {
      if (!acc[s.choice]) {
        acc[s.choice] = 0;
      }
      acc[s.choice]++;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    votes: groupedScore,
    totalVotes: score.length,
  };
}
