import ListExerciseTable from "@/components/list-exercise-table";
import { prisma } from "../../../../prisma/client";
import content from "@/content/(main)/list-exercise/content-list-exercise-page";
import SummaryListExercise from "@/components/summary-list-exercise";
import { SummaryContent } from "@/components/summary-list-exercise";
import { default as summaryContentLabel } from "@/content/(main)/list-exercise/content-summary-list";
import Header from "@/components/header";

export const dynamic = "force-dynamic";

export default async function ListExercisePage() {
  let exercises;
  try {
    exercises = await prisma.exercise.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (e) {
    throw new Error("Error when retrieving exercises data from database");
  }

  const summaryContent: SummaryContent = [
    {
      description: summaryContentLabel.totalExercise,
      count: exercises.length,
    },
    {
      description: summaryContentLabel.haveDone,
      count: exercises.reduce((sum, exercise) => {
        return exercise.numOfTimesCompleted > 0 ? sum + 1 : sum;
      }, 0),
    },
    {
      description: summaryContentLabel.newExercise,
      count: exercises.reduce((sum, exercise) => {
        return exercise.numOfTimesCompleted === 0 ? sum + 1 : sum;
      }, 0),
    },
  ];

  return (
    <div>
      <Header>{content.heading}</Header>
      <SummaryListExercise content={summaryContent} />
      <ListExerciseTable exercises={exercises} />
    </div>
  );
}
