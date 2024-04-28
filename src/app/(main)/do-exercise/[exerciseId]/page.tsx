import Button from "@/components/general-button";
import { prisma } from "../../../../../prisma/client";
import content from "@/content/(main)/do-exercise/content-do-specific-exercise-page";
import Image from "next/image";
import DoSpecificExerciseForm from "@/components/do-specific-exercise-form";
import getRandomExercise from "@/function/get-random-exercise";
import Link from "next/link";

export default async function DoSpecificExercisePage({
  params,
}: {
  params: { exerciseId: string };
}) {
  const exerciseId = Number(params.exerciseId);

  if (!exerciseId) {
    throw new Error("Invalid exercise id");
  }

  let exercise;
  try {
    exercise = await prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    });
  } catch (e) {
    throw new Error("Error when fetching database");
  }

  if (!exercise) {
    throw new Error(
      `Exercise with id ${exerciseId} does not exist in database`,
    );
  }

  const randomExercise = await getRandomExercise();
  const newExerciseId = randomExercise?.id || "no-exercise";

  return (
    <div>
      <h5 className="mb-5 text-xl font-bold dark:text-white">
        {content.questionTitle}
      </h5>
      <p className="mb-5 text-gray-600 dark:text-gray-400">
        {exercise.question}
      </p>
      {exercise.imageUrl && (
        <Image
          src={exercise.imageUrl}
          width={400}
          height={400}
          alt="Problem's image"
          className="mb-5"
        />
      )}
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="italic">{content.numOfTimesDone} </span>
        <span>{exercise.numOfTimesCompleted}</span>
      </p>
      <DoSpecificExerciseForm exerciseId={exercise.id}>
        <Link href={`/do-exercise/${newExerciseId}`}>
          <Button>{content.doAnotherExercise}</Button>
        </Link>
      </DoSpecificExerciseForm>
    </div>
  );
}
