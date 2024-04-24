import Card from "@/components/card";
import content from "@/content/(main)/do-exercise/content-do-exercise-page";
import getRandomExercise from "@/function/get-random-exercise";
import Link from "next/link";

export default async function DoExercisePage() {
  const randomExerciseId = (await getRandomExercise()).id.toString();

  return (
    <div className="flex justify-evenly">
      <Link href={`/do-exercise/${randomExerciseId}`}>
        <Card
          header={content.doRandomExerciseHeader}
          body={content.doRandomExerciseBody}
        />
      </Link>
      <Link href="/list-exercise">
        <Card
          header={content.chooseExerciseHeader}
          body={content.chooseExerciseBody}
        />
      </Link>
    </div>
  );
}
