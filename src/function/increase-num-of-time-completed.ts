import { prisma } from "../../prisma/client";

export default async function increaseNumOfTimeCompleted(exerciseId: number) {
  await prisma.exercise.update({
    where: {
      id: exerciseId,
    },
    data: {
      numOfTimesCompleted: {
        increment: 1,
      }
    }
  })
}
