import "server-only"
import getRandomItem from "./get-random-item";

import { prisma } from "../../prisma/client";

/**
 *  Return a randomly selected
 *  suitable exercise in the database for the user to do it.
 *  
 *  Factors to choose:
 *  - Number of time finished is as low as possible
 *
 */
export default async function getRandomExercise() {
  let exercises;
  try {
    exercises = await prisma.exercise.findMany({
      orderBy: {
        numOfTimesCompleted: "asc",
      }
    })
  }
  catch (e) {
    throw new Error("Cannot fetch data from database");
  }

  if (!(exercises.length > 0)) {
    throw new Error("There are no exercise in the database");
  }

  const exercisesWithLowestTimeDone = exercises.filter(exercise => exercise.numOfTimesCompleted <= exercises[0].numOfTimesCompleted);

  const randomExercise = getRandomItem(exercisesWithLowestTimeDone);

  return randomExercise;
}
