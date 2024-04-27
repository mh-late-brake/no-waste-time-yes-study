import { prisma } from "../../prisma/client";

type CheckAnswerType = "No correct answer in DB so Correct no matter what" | "Correct" | "Incorrect";

export default async function checkAnswer(exerciseId: number, answer: string): Promise<CheckAnswerType> {
  const exerciseInfo = await prisma.exercise.findFirst({
    where: {
      id: exerciseId,
    }
  })
  if (!exerciseInfo) {
    throw new Error(`There is not exercise with id ${exerciseId} in the database`);
  }

  // If that exercise doesn't have correct answer in the database,
  // no matter what the user's current answer is, they did correct
  if (!exerciseInfo.correctAnswer) {
    return "No correct answer in DB so Correct no matter what";
  }
  if (exerciseInfo.correctAnswer.toLowerCase() === answer.toLowerCase()) {
    return "Correct";
  }
  return "Incorrect";
}
