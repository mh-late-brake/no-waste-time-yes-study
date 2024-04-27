"use server"

import { z } from "zod"
import content from "@/content/(main)/do-exercise/content-do-specific-exercise-page";
import checkAnswer from "@/function/check-answer";
import increasePlaytime from "@/function/increase-playtime";
import increaseNumOfTimeCompleted from "@/function/increase-num-of-time-completed";
import { revalidatePath } from "next/cache";

const schema = z.object({
  exerciseId: z.string(),
  submittedAnswer: z.string(),
})

export default async function submitExercise(_prevFormState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    exerciseId: formData.get(content.inputIdLabel),
    submittedAnswer: formData.get(content.inputAnswerLabel),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      error: "Error when parsing form data",
    }
  }

  const data = validatedFields.data;

  const isCorrect = await checkAnswer(+data.exerciseId, data.submittedAnswer);

  if (isCorrect !== "Incorrect") {
    await increasePlaytime();
    await increaseNumOfTimeCompleted(+data.exerciseId);
    revalidatePath("/");
    return {
      status: isCorrect,
    }
  }
  else {
    return {
      status: isCorrect
    }
  }
}
